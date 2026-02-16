import DefaultTheme from 'vitepress/theme';
import './custom.css';
import { onMounted, watch } from 'vue';
import { useData } from 'vitepress';
import type { Theme } from 'vitepress';

export default {
  extends: DefaultTheme,
  setup() {
    const { isDark } = useData();

    onMounted(() => {
      // svg-pan-zoom を動的にインポートして Mermaid SVG に適用
      import('svg-pan-zoom').then((module) => {
        const svgPanZoom = module.default;
        let dialogInstance: any = null;
        let currentSourceSvg: SVGElement | null = null;

        // ダイアログ要素を作成
        const createDialog = () => {
          const dialog = document.createElement('dialog');
          dialog.className = 'mermaid-fullscreen-dialog';
          dialog.innerHTML = `
            <div class="dialog-content">
              <button class="dialog-close" aria-label="Close">×</button>
              <div class="dialog-svg-container"></div>
            </div>
          `;
          document.body.appendChild(dialog);

          // ダイアログを閉じる共通関数
          const closeDialog = () => {
            if (dialogInstance) {
              dialogInstance.destroy();
              dialogInstance = null;
            }
            currentSourceSvg = null;
            dialog.close();
          };

          // 閉じるボタンのイベント
          const closeBtn = dialog.querySelector('.dialog-close');
          closeBtn?.addEventListener('click', closeDialog);

          // バックドロップクリックで閉じる
          dialog.addEventListener('click', (e) => {
            if (e.target === dialog) {
              closeDialog();
            }
          });

          // ESCキーで閉じた場合もクリーンアップ
          dialog.addEventListener('close', () => {
            if (dialogInstance) {
              dialogInstance.destroy();
              dialogInstance = null;
            }
            currentSourceSvg = null;
          });

          return dialog;
        };

        const dialog = createDialog();

        // ダイアログ内のSVGを更新する関数
        const updateDialogSvg = () => {
          if (!dialog.open || !currentSourceSvg) return;

          const container = dialog.querySelector('.dialog-svg-container');
          if (!container) return;

          // 現在のソースSVGの親要素（.mermaid）を取得
          const mermaidContainer = currentSourceSvg.closest('.mermaid');
          if (!mermaidContainer) return;

          // 最新のSVGを取得（テーマ切り替え後は新しいSVGになっている可能性）
          const latestSvg = mermaidContainer.querySelector('svg');
          if (!latestSvg) return;

          // 古いsvg-pan-zoomインスタンスを破棄
          if (dialogInstance) {
            dialogInstance.destroy();
            dialogInstance = null;
          }

          // 最新のSVGをクローンして表示
          const clonedSvg = latestSvg.cloneNode(true) as SVGElement;
          container.innerHTML = '';
          container.appendChild(clonedSvg);

          // 新しいSVGにsvg-pan-zoomを適用
          try {
            dialogInstance = svgPanZoom(clonedSvg, {
              zoomEnabled: true,
              controlIconsEnabled: true,
              fit: true,
              center: true,
              minZoom: 0.1,
              maxZoom: 20,
              zoomScaleSensitivity: 0.3,
            });
          } catch (error) {
            console.warn('svg-pan-zoom init failed in dialog:', error);
          }

          // ソースSVGの参照を更新
          currentSourceSvg = latestSvg;
        };

        // Mermaidコンテナにイベント委譲でクリックイベントを追加
        const initializeMermaidContainers = () => {
          const mermaidContainers = document.querySelectorAll('.mermaid');

          mermaidContainers.forEach((container) => {
            // すでに初期化されている場合はスキップ
            if ((container as any).__mermaidContainerInitialized) {
              return;
            }

            // クリックで全画面表示（イベント委譲）
            container.addEventListener('click', (e) => {
              const svg = container.querySelector('svg');
              if (!svg) return;

              const dialogContainer = dialog.querySelector('.dialog-svg-container');
              if (!dialogContainer) return;

              // 現在のソースコンテナとSVGを記録
              currentSourceSvg = svg as SVGElement;

              // SVGのouterHTMLを取得して新しいSVG要素を作成
              const svgHTML = svg.outerHTML;
              dialogContainer.innerHTML = svgHTML;
              const dialogSvg = dialogContainer.querySelector('svg') as SVGElement;

              if (!dialogSvg) return;

              // ダイアログ内のSVGのIDを変更して、Mermaidの再レンダリングとの競合を回避
              const originalId = dialogSvg.id;
              if (originalId) {
                const newId = `${originalId}-dialog`;
                dialogSvg.id = newId;
                // スタイル内のID参照も更新
                const styleElement = dialogSvg.querySelector('style');
                if (styleElement && styleElement.textContent) {
                  styleElement.textContent = styleElement.textContent.replace(
                    new RegExp(`#${originalId}`, 'g'),
                    `#${newId}`
                  );
                }
              }

              // ダイアログを表示
              dialog.showModal();

              // ダイアログ内のSVGにsvg-pan-zoomを適用
              try {
                if (dialogInstance) {
                  dialogInstance.destroy();
                }
                dialogInstance = svgPanZoom(dialogSvg, {
                  zoomEnabled: true,
                  controlIconsEnabled: true,
                  fit: true,
                  center: true,
                  minZoom: 0.1,
                  maxZoom: 20,
                  zoomScaleSensitivity: 0.3,
                });
              } catch (error) {
                console.warn('svg-pan-zoom init failed in dialog:', error);
              }
            });

            // 初期化済みフラグを設定
            (container as any).__mermaidContainerInitialized = true;
          });
        };

        // 初回実行
        initializeMermaidContainers();

        // ダークモード切り替え時にダイアログ内のSVGを更新
        watch(isDark, () => {
          // Mermaidの再レンダリングを待ってからダイアログを更新
          setTimeout(() => {
            updateDialogSvg();
          }, 500);
        });

        // ページ遷移時に再初期化（VitePress の SPA 対応）
        let debounceTimer: ReturnType<typeof setTimeout> | null = null;
        const observer = new MutationObserver(() => {
          if (debounceTimer) clearTimeout(debounceTimer);
          debounceTimer = setTimeout(() => {
            initializeMermaidContainers();
          }, 300);
        });

        observer.observe(document.body, {
          childList: true,
          subtree: true,
        });
      });
    });
  },
} satisfies Theme;
