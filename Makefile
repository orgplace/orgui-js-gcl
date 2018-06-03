SHELL=/bin/bash -o pipefail

TARGET_DIR = dist
SOURCE_DIR = src
SOURCES = $(shell find $(SOURCE_DIR) -type f -name '*.js')
LIB_DIR = lib
LIB_SOURCES = $(shell find lib -type f -name '*.js' -not -name '*.test.js')
TARGETS = $(patsubst $(SOURCE_DIR)/%,$(TARGET_DIR)/%,$(SOURCES))

.DELETE_ON_ERROR:

# Delete the default suffixes for old-fashioned suffix rules
.SUFFIXES:

.PHONY: all test sources lint clean

all: lint $(TARGETS) test sources

lint: $(SOURCES) $(LIB_SOURCES)
	npm run lint -- $(SOURCE_DIR) $(LIB_DIR)

CLOSURE_COMPILER = closure-compiler/compiler.jar
CLOSURE_COMPILATION_LEVEL = ADVANCED_OPTIMIZATIONS
#CLOSURE_COMPILATION_LEVEL = SIMPLE_OPTIMIZATIONS
#CLOSURE_COMPILATION_LEVEL = WHITESPACE_ONLY

$(TARGET_DIR)/%.js: $(SOURCE_DIR)/%.js $(LIB_SOURCES)
	-mkdir -p $(dir $@)
	$(eval SOURCE_MAP_RELATIVE := $(shell echo "$<" | sed -e 's:\([^/]*\):..:g' -e 's:../..$$::g'))
	java -client -XX:+TieredCompilation -XX:TieredStopAtLevel=1 -Xverify:none -Xms1024m -Xmx1024m -jar $(CLOSURE_COMPILER) \
		--language_in=ECMASCRIPT6_STRICT \
		--language_out=ECMASCRIPT5_STRICT \
		--process_common_js_modules \
		--rewrite_polyfills=false \
		--output_wrapper='(()=>{%output%})();' \
		--compilation_level=$(CLOSURE_COMPILATION_LEVEL) \
		--jscomp_off=checkVars \
		--module_resolution=BROWSER \
		--create_source_map "$@.map" \
		--source_map_location_mapping "src|$(SOURCE_MAP_RELATIVE)src" \
		--source_map_location_mapping "lib|$(SOURCE_MAP_RELATIVE)lib" \
		--js_output_file $@ \
		$^
	echo "//# sourceMappingURL=$(notdir $@).map" >> $@

test: $(TARGETS)
#	npm run test

sources: $(SOURCES) $(LIB_SOURCES)
	rsync -avr --delete $(SOURCE_DIR)/ $(TARGET_DIR)/$(SOURCE_DIR)/
	rsync -avr --delete $(LIB_DIR)/ $(TARGET_DIR)/$(LIB_DIR)/

clean:
	-rm -rf $(TARGET_DIR)
