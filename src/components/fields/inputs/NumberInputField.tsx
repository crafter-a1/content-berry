
            style={{
              ...inputStyle,
              paddingLeft: prefix ? "2rem" : inputStyle.padding,
              paddingRight: suffix ? "2rem" : inputStyle.padding,
              borderColor: invalid ? 'rgb(239, 68, 68)' : (colors.border || "#e2e8f0")
            }}
