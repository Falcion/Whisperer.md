#!/bin/bash

# Variables
EXCLUDING_FOLDERS=("node_modules" "dist" "venv" ".git" "$git" "$" "out" "bin")
EXCLUDING_VALUES=("FALCION" "PATTERNU" "PATTERNUGIT" "PATTERNUGIT.NET")
ROOT_DIRECTORY=$(pwd)

# Logging functions
info() {
	echo "[INFO] $1"
}

# Search function
search() {
	local filepath="$1"
	info "Searching in $filepath"
	while IFS= read -r line; do
		for word in "${EXCLUDING_VALUES[@]}"; do
			if [[ "$line" == *"$word"* ]]; then
				info "Found \"$word\" in $filepath"
			fi
		done
	done <"$filepath"
}

# Traverse function
traverse() {
	local directory="$1"
	info "Traversing directory: $directory"
	for item in "$directory"/*; do
		if [ -d "$item" ]; then
			local dirname
			dirname=$(basename "$item") # Declare and assign separately
			# Use a loop to check against the EXCLUDING_FOLDERS array
			local exclude=false
			for excluded in "${EXCLUDING_FOLDERS[@]}"; do
				if [[ "$dirname" == "$excluded" ]]; then
					exclude=true
					break
				fi
			done
			if [ "$exclude" = false ]; then
				traverse "$item"
			fi
		elif [ -f "$item" ]; then
			info "Processing file: $item"
			search "$item"
		fi
	done
}

# Main script
echo "Do you want to update the settings? (Y/N/IGNORE)"
read -r mode
if [[ "$mode" != "IGNORE" ]]; then
	echo "Enter words separated by a comma:"
	read -r params
	IFS=',' read -ra entries <<<"$params"
	info "Updating settings with: ${entries[*]}"
	EXCLUDING_VALUES+=("${entries[@]}")
fi

traverse "$ROOT_DIRECTORY"
