/**
 * CSS 变量生成工具
 * 根据配置动态生成 CSS 变量样式
 */

export interface CSSVariableConfig {
  primaryColor: string
  fontFamily: string
  fontSize: string
  isUseIndent?: boolean
  isUseJustify?: boolean
  // 公式设置
  inlineFormulaSize?: string
  blockFormulaSize?: string
  formulaBackground?: string
  // 排版设置
  headingLineHeight?: string
  paragraphLineHeight?: string
  headingMarginTop?: string
  headingMarginBottom?: string
  paragraphMarginTop?: string
  paragraphMarginBottom?: string
  // 样式快捷选项
  blockquoteBorderWidth?: string
  blockquoteBorderColor?: string
  blockquoteBackground?: string
  codeBorderRadius?: string
  tableBorderWidth?: string
  tableBorderColor?: string
}

/**
 * 生成 CSS 变量样式
 * @param config - 配置对象
 * @returns CSS 变量字符串
 */
export function generateCSSVariables(config: CSSVariableConfig): string {
  return `
:root {
  /* 动态配置变量 */
  --md-primary-color: ${config.primaryColor};
  --md-font-family: ${config.fontFamily};
  --md-font-size: ${config.fontSize};
  
  /* 公式变量 */
  --inline-formula-size: ${config.inlineFormulaSize || '1.0em'};
  --block-formula-size: ${config.blockFormulaSize || '1.05em'};
  --formula-background: ${config.formulaBackground || 'rgba(0, 0, 0, 0.02)'};
  
  /* 排版变量 */
  --heading-line-height: ${config.headingLineHeight || '1.2'};
  --paragraph-line-height: ${config.paragraphLineHeight || '1.5'};
  --heading-margin-top: ${config.headingMarginTop || '2em'};
  --heading-margin-bottom: ${config.headingMarginBottom || '0.75em'};
  --paragraph-margin-top: ${config.paragraphMarginTop || '1.5em'};
  --paragraph-margin-bottom: ${config.paragraphMarginBottom || '1.5em'};
  
  /* 样式快捷选项变量 */
  --blockquote-border-width: ${config.blockquoteBorderWidth || '4px'};
  --blockquote-border-color: ${config.blockquoteBorderColor || 'var(--md-primary-color)'};
  --blockquote-background: ${config.blockquoteBackground || 'rgba(0, 0, 0, 0.05)'};
  --code-border-radius: ${config.codeBorderRadius || '8px'};
  --table-border-width: ${config.tableBorderWidth || '1px'};
  --table-border-color: ${config.tableBorderColor || '#dfdfdf'};
}

/* 段落缩进和对齐 */
#output p {
  ${config.isUseIndent ? 'text-indent: 2em;' : ''}
  ${config.isUseJustify ? 'text-align: justify;' : ''}
}

/* 动态样式快捷选项 */
#output blockquote {
  border-left: var(--blockquote-border-width) solid var(--blockquote-border-color);
  background: var(--blockquote-background);
}

#output pre.code__pre, #output .hljs.code__pre {
  border-radius: var(--code-border-radius);
}

#output table th, #output table td {
  border: var(--table-border-width) solid var(--table-border-color);
}

/* 动态公式样式 */
#output .katex-inline {
  font-size: var(--inline-formula-size) !important;
  background: var(--formula-background);
}

#output .katex-block {
  font-size: var(--block-formula-size) !important;
  background: var(--formula-background);
}

/* 动态排版样式 */
#output h1, #output h2, #output h3, #output h4, #output h5, #output h6 {
  line-height: var(--heading-line-height);
  margin-top: var(--heading-margin-top);
  margin-bottom: var(--heading-margin-bottom);
}

#output p {
  line-height: var(--paragraph-line-height);
  margin-top: var(--paragraph-margin-top);
  margin-bottom: var(--paragraph-margin-bottom);
}
  `.trim()
}
