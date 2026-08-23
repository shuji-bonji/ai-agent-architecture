#!/bin/bash

# Generate llms-full.txt — concatenate English Markdown pages (book-v2 order).
# Skips Japanese (/ja), redirect stubs (concepts/*, skills/overview), and work notes.

set -euo pipefail

RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m'

DOCS_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/../docs" && pwd)"
OUTPUT_FILE="$(cd "$(dirname "${BASH_SOURCE[0]}")/../docs/public" && pwd)/llms-full.txt"
PUBLIC_DIR="$(dirname "$OUTPUT_FILE")"
BASE_URL="https://shuji-bonji.github.io/ai-agent-architecture"

mkdir -p "$PUBLIC_DIR"

echo -e "${BLUE}Generating llms-full.txt...${NC}"
echo "Docs directory: $DOCS_DIR"
echo "Output file: $OUTPUT_FILE"

strip_frontmatter() {
	local file="$1"
	local in_frontmatter=false
	local line_num=0

	while IFS= read -r line || [[ -n "$line" ]]; do
		((line_num++)) || true
		if [[ $line_num -eq 1 ]]; then
			if [[ "$line" == "---" ]]; then
				in_frontmatter=true
			else
				echo "$line"
			fi
		elif [[ "$in_frontmatter" == true && "$line" == "---" ]]; then
			in_frontmatter=false
		elif [[ "$in_frontmatter" == false ]]; then
			echo "$line"
		fi
	done < "$file"
}

get_title() {
	local file="$1"
	local title=""
	# Prefer frontmatter title
	title=$(awk '
		BEGIN { in_fm=0 }
		NR==1 && $0=="---" { in_fm=1; next }
		in_fm && $0=="---" { exit }
		in_fm && $0 ~ /^title:[[:space:]]*/ {
			sub(/^title:[[:space:]]*/, "")
			gsub(/^["'\'']|["'\'']$/, "")
			print
			exit
		}
	' "$file")
	if [[ -n "$title" ]]; then
		echo "$title"
		return
	fi
	# Fallback: first H1
	awk '/^# / { sub(/^# /, ""); print; exit }' "$file"
}

file_to_url() {
	local file="$1"
	local rel_path="${file#$DOCS_DIR/}"
	rel_path="${rel_path%.md}"
	if [[ "$rel_path" == "index" ]]; then
		echo "${BASE_URL}/"
	elif [[ "$rel_path" =~ /index$ ]]; then
		echo "${BASE_URL}/${rel_path%/index}/"
	else
		echo "${BASE_URL}/${rel_path}"
	fi
}

declare -a FILES_TO_PROCESS

# Book core
FILES_TO_PROCESS+=(
	"$DOCS_DIR/preface.md"
	"$DOCS_DIR/part-1/constraints.md"
	"$DOCS_DIR/part-2/layers.md"
	"$DOCS_DIR/part-2/placement.md"
	"$DOCS_DIR/part-3/doctrine.md"
	"$DOCS_DIR/part-3/memory.md"
	"$DOCS_DIR/part-4/patterns.md"
	"$DOCS_DIR/part-4/limits.md"
	"$DOCS_DIR/part-4/physical.md"
	"$DOCS_DIR/part-4/prompt-decomposition.md"
)

# Skills
FILES_TO_PROCESS+=(
	"$DOCS_DIR/skills/what-is-skills.md"
	"$DOCS_DIR/skills/creating-skills.md"
	"$DOCS_DIR/skills/how-to-create-skills.md"
	"$DOCS_DIR/skills/how-to-use-skills.md"
	"$DOCS_DIR/skills/skill-use-cases.md"
	"$DOCS_DIR/skills/conversation-to-skill.md"
	"$DOCS_DIR/skills/vs-mcp.md"
	"$DOCS_DIR/skills/anti-patterns.md"
	"$DOCS_DIR/skills/showcase.md"
)

# MCP
FILES_TO_PROCESS+=(
	"$DOCS_DIR/mcp/what-is-mcp.md"
	"$DOCS_DIR/mcp/semantic-layer.md"
	"$DOCS_DIR/mcp/catalog.md"
	"$DOCS_DIR/mcp/security.md"
	"$DOCS_DIR/mcp/development.md"
)

# Agents
FILES_TO_PROCESS+=(
	"$DOCS_DIR/agents/index.md"
	"$DOCS_DIR/agents/what-is-a2a.md"
	"$DOCS_DIR/agents/what-is-subagent.md"
	"$DOCS_DIR/agents/subagent-vs-skill.md"
	"$DOCS_DIR/agents/subagent-quality-gate.md"
	"$DOCS_DIR/agents/agent-identity.md"
	"$DOCS_DIR/agents/agent-taxonomy.md"
	"$DOCS_DIR/agents/agent-teams.md"
)

# Strategy
FILES_TO_PROCESS+=(
	"$DOCS_DIR/strategy/composition-patterns.md"
	"$DOCS_DIR/strategy/mcp-family.md"
	"$DOCS_DIR/strategy/deterministic-verdicts.md"
	"$DOCS_DIR/strategy/local-llm-workspace-mapping.md"
	"$DOCS_DIR/strategy/harness-engineering-mapping.md"
	"$DOCS_DIR/strategy/hooks.md"
	"$DOCS_DIR/strategy/proposal-and-binding.md"
	"$DOCS_DIR/strategy/permission-vs-authority.md"
	"$DOCS_DIR/strategy/specialization-weights-vs-context.md"
	"$DOCS_DIR/strategy/routing-vs-cascading.md"
	"$DOCS_DIR/strategy/agent-loop-patterns.md"
	"$DOCS_DIR/strategy/discovery-vs-production.md"
	"$DOCS_DIR/strategy/loop-engineering.md"
)

# FAQ
FILES_TO_PROCESS+=(
	"$DOCS_DIR/faq/scope-of-ai-agent.md"
	"$DOCS_DIR/faq/mcp-vs-skills.md"
	"$DOCS_DIR/faq/agent-vs-subagent-vs-skill.md"
)

# Information & workflows
FILES_TO_PROCESS+=(
	"$DOCS_DIR/information/index.md"
	"$DOCS_DIR/information/architecture-map.md"
	"$DOCS_DIR/workflows/development-phases.md"
	"$DOCS_DIR/workflows/patterns.md"
	"$DOCS_DIR/workflows/patterns/translation.md"
	"$DOCS_DIR/workflows/patterns/specification-verification.md"
	"$DOCS_DIR/workflows/patterns/compliance.md"
	"$DOCS_DIR/workflows/patterns/development-support.md"
	"$DOCS_DIR/workflows/patterns/documentation-generation.md"
	"$DOCS_DIR/workflows/patterns/multi-agent.md"
	"$DOCS_DIR/workflows/autonomous-dev-meta-agent.md"
)

# Reference
FILES_TO_PROCESS+=(
	"$DOCS_DIR/glossary.md"
	"$DOCS_DIR/outputs.md"
	"$DOCS_DIR/reference-selection-checklist.md"
)

TEMP_FILE=$(mktemp)
trap 'rm -f "$TEMP_FILE"' EXIT

{
	cat << 'EOF'
# LLM Agent Design Architecture

> Design of agents whose inference core is a foundation model (LLM). Book-form documentation of the five layers (Doctrine / Agent / Skills / Memory / MCP), knowledge placement, and rollout strategy.

This file concatenates English pages in reading order for bulk consumption by language models.
Site: https://shuji-bonji.github.io/ai-agent-architecture/
Japanese mirror: https://shuji-bonji.github.io/ai-agent-architecture/ja/

---

EOF

	count=0
	total=${#FILES_TO_PROCESS[@]}
	processed=0

	for file in "${FILES_TO_PROCESS[@]}"; do
		((count++)) || true
		if [[ ! -f "$file" ]]; then
			echo "Warning: File not found: $file" >&2
			continue
		fi
		((processed++)) || true

		title=$(get_title "$file")
		url=$(file_to_url "$file")

		echo "## ${title:-$(basename "$file" .md)}"
		echo ""
		echo "Source: $url"
		echo ""
		strip_frontmatter "$file"

		if [[ $count -lt $total ]]; then
			echo ""
			echo "---"
			echo ""
		fi

		printf "%s[%d/%d]%s Processed: %s\n" "$BLUE" "$count" "$total" "$NC" "$file" >&2
	done
} > "$TEMP_FILE"

if [[ -s "$TEMP_FILE" ]]; then
	cp "$TEMP_FILE" "$OUTPUT_FILE"
	file_size=$(du -h "$OUTPUT_FILE" | cut -f1)
	line_count=$(wc -l < "$OUTPUT_FILE")
	echo ""
	printf "%s✓ Successfully generated llms-full.txt%s\n" "$GREEN" "$NC"
	echo "  Location: $OUTPUT_FILE"
	echo "  File size: $file_size"
	echo "  Lines: $line_count"
	echo "  Pages listed: ${#FILES_TO_PROCESS[@]}"
	echo "  Pages processed: $processed"
else
	printf "%s✗ Failed to generate output file%s\n" "$RED" "$NC"
	exit 1
fi
