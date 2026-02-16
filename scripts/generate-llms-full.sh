#!/bin/bash

# Generate llms-full.txt - Concatenate all English Markdown files from VitePress build
# This script follows the exclusion rules from docs/.vitepress/config.ts and generates
# a single consolidated documentation file suitable for LLM training and reference.

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
DOCS_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/../docs" && pwd)"
OUTPUT_FILE="$(cd "$(dirname "${BASH_SOURCE[0]}")/../docs/public" && pwd)/llms-full.txt"
PUBLIC_DIR="$(dirname "$OUTPUT_FILE")"
BASE_URL="https://shuji-bonji.github.io/ai-agent-architecture"

# Ensure output directory exists
mkdir -p "$PUBLIC_DIR"

echo -e "${BLUE}Generating llms-full.txt...${NC}"
echo "Docs directory: $DOCS_DIR"
echo "Output file: $OUTPUT_FILE"

# Function to strip YAML frontmatter
strip_frontmatter() {
    local file="$1"
    local in_frontmatter=false
    local line_num=0

    while IFS= read -r line; do
        ((line_num++))

        # Check for opening --- on line 1
        if [[ $line_num -eq 1 ]]; then
            if [[ "$line" == "---" ]]; then
                in_frontmatter=true
            else
                echo "$line"
            fi
        # Check for closing ---
        elif [[ "$in_frontmatter" == true && "$line" == "---" ]]; then
            in_frontmatter=false
        # Output lines after frontmatter
        elif [[ "$in_frontmatter" == false ]]; then
            echo "$line"
        fi
    done < "$file"
}

# Function to get title from file
get_title() {
    local file="$1"
    local in_frontmatter=false
    local found_title=false

    while IFS= read -r line; do
        if [[ "$line" == "---" ]]; then
            if [[ "$found_title" == true ]]; then
                break
            fi
            in_frontmatter=true
        elif [[ "$found_title" == false && "$in_frontmatter" == false ]]; then
            # First H1 heading
            if [[ "$line" =~ ^#\ (.+)$ ]]; then
                echo "${BASH_REMATCH[1]}"
                found_title=true
            fi
        fi
    done < "$file"
}

# Function to get URL path from file path
get_url_path() {
    local file="$1"
    local rel_path="${file#$DOCS_DIR/}"

    # Remove .md extension
    rel_path="${rel_path%.md}"

    # Handle index.md -> just the directory
    if [[ "$rel_path" == "index" ]]; then
        echo ""
    elif [[ "$rel_path" =~ /index$ ]]; then
        rel_path="${rel_path%/index}"
        echo "$rel_path/"
    else
        echo "$rel_path/"
    fi
}

# Function to convert file path to URL
file_to_url() {
    local file="$1"
    local url_path=$(get_url_path "$file")

    if [[ -z "$url_path" ]]; then
        echo "$BASE_URL/"
    else
        echo "${BASE_URL}/${url_path}"
    fi
}

# Build ordered file list following sidebar structure
declare -a FILES_TO_PROCESS

# 1. Concepts (in order)
FILES_TO_PROCESS+=(
    "$DOCS_DIR/concepts/01-vision.md"
    "$DOCS_DIR/concepts/02-reference-sources.md"
    "$DOCS_DIR/concepts/03-architecture.md"
    "$DOCS_DIR/concepts/04-ai-design-patterns.md"
    "$DOCS_DIR/concepts/05-solving-ai-limitations.md"
)

# 2. MCP
FILES_TO_PROCESS+=(
    "$DOCS_DIR/mcp/what-is-mcp.md"
    "$DOCS_DIR/mcp/catalog.md"
    "$DOCS_DIR/mcp/security.md"
    "$DOCS_DIR/mcp/development.md"
)

# 3. Skills
FILES_TO_PROCESS+=(
    "$DOCS_DIR/skills/what-is-skills.md"
    "$DOCS_DIR/skills/creating-skills.md"
    "$DOCS_DIR/skills/vs-mcp.md"
    "$DOCS_DIR/skills/anti-patterns.md"
    "$DOCS_DIR/skills/overview.md"
)

# 4. Agents
FILES_TO_PROCESS+=(
    "$DOCS_DIR/agents/what-is-a2a.md"
    "$DOCS_DIR/agents/what-is-subagent.md"
)

# 5. Strategy
FILES_TO_PROCESS+=(
    "$DOCS_DIR/strategy/composition-patterns.md"
    "$DOCS_DIR/strategy/mcp-roadmap.md"
    "$DOCS_DIR/strategy/skill-roadmap.md"
)

# 6. Workflows
FILES_TO_PROCESS+=(
    "$DOCS_DIR/workflows/development-phases.md"
    "$DOCS_DIR/workflows/patterns.md"
)

# 7. Root level files
FILES_TO_PROCESS+=(
    "$DOCS_DIR/glossary.md"
    "$DOCS_DIR/outputs.md"
    "$DOCS_DIR/roadmap.md"
)

# Temporary file for accumulating output
TEMP_FILE=$(mktemp)
trap "rm -f '$TEMP_FILE'" EXIT

{
    # Header with intro
    cat << 'EOF'
# AI Agent Architecture

> A documentation site explaining how AI agents discover and orchestrate Skills, Tools, and Protocols...

This document is a comprehensive concatenation of all English documentation pages from the AI Agent Architecture project. It includes foundational concepts, MCP (Model Context Protocol) guidance, Skills framework, Agent architecture, strategy, and workflows.

---

EOF

    count=0
    total=${#FILES_TO_PROCESS[@]}

    for file in "${FILES_TO_PROCESS[@]}"; do
        ((count++))

        # Check if file exists
        if [[ ! -f "$file" ]]; then
            echo "Warning: File not found: $file" >&2
            continue
        fi

        # Get metadata
        title=$(get_title "$file")
        url=$(file_to_url "$file")

        # Output section header
        echo "## $title"
        echo ""
        echo "Source: $url"
        echo ""

        # Output content (with frontmatter stripped)
        strip_frontmatter "$file"

        # Add separator between sections (except for last one)
        if [[ $count -lt $total ]]; then
            echo ""
            echo "---"
            echo ""
        fi

        # Progress indicator
        printf "%s[%d/%d]%s Processed: %s\n" "$BLUE" "$count" "$total" "$NC" "$file" >&2
    done
} > "$TEMP_FILE"

# Check if we successfully generated content
if [[ -s "$TEMP_FILE" ]]; then
    cp "$TEMP_FILE" "$OUTPUT_FILE"

    # Report results
    file_size=$(du -h "$OUTPUT_FILE" | cut -f1)
    line_count=$(wc -l < "$OUTPUT_FILE")

    echo ""
    printf "%s✓ Successfully generated llms-full.txt%s\n" "$GREEN" "$NC"
    echo "  Location: $OUTPUT_FILE"
    echo "  File size: $file_size"
    echo "  Lines: $line_count"
    echo "  Pages processed: ${#FILES_TO_PROCESS[@]}"
else
    printf "%s✗ Failed to generate output file%s\n" "$RED" "$NC"
    exit 1
fi
