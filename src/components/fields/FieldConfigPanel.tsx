
              <BlockEditorField
                id="preview-blockeditor"
                value=""
                onChange={() => {}}
                label={fieldName}
                placeholder={placeholder}
                helpText={helpText}
                minHeight={typeof form.watch('minHeight') === 'string' ? 
                  form.watch('minHeight') : `${form.watch('minHeight')}px`}
              />
