<script setup lang="ts">
import type {
  themeMap,
} from '@md/shared/configs'
import type { Format } from 'vue-pick-colors'
import {
  codeBlockThemeOptions,
  colorOptions,
  fontFamilyOptions,
  fontSizeOptions,
  legendOptions,
  themeOptions,
} from '@md/shared/configs'
import { X } from 'lucide-vue-next'
import PickColors from 'vue-pick-colors'
import { useEditorStore } from '@/stores/editor'
import { useRenderStore } from '@/stores/render'
import { useThemeStore } from '@/stores/theme'
import { useUIStore } from '@/stores/ui'

const themeStore = useThemeStore()
const {
  theme,
  fontFamily,
  fontSize,
  primaryColor,
  codeBlockTheme,
  legend,
  isMacCodeBlock,
  isShowLineNumber,
  isCiteStatus,
  isUseIndent,
  isUseJustify,
  // 公式设置
  inlineFormulaSize,
  blockFormulaSize,
  formulaBackground,
  // 排版设置
  headingLineHeight,
  paragraphLineHeight,
  headingMarginTop,
  headingMarginBottom,
  paragraphMarginTop,
  paragraphMarginBottom,
  // 样式快捷选项
  blockquoteBorderWidth,
  blockquoteBorderColor,
  blockquoteBackground,
  codeBorderRadius,
  tableBorderWidth,
  tableBorderColor,
} = storeToRefs(themeStore)

const uiStore = useUIStore()
const { isMobile, isOpenRightSlider, isDark } = storeToRefs(uiStore)

const editorStore = useEditorStore()
const renderStore = useRenderStore()

// Editor refresh function - triggers re-render with current theme settings
function editorRefresh() {
  themeStore.updateCodeTheme()

  const raw = editorStore.getContent()
  renderStore.render(raw, {
    isCiteStatus: themeStore.isCiteStatus,
    legend: themeStore.legend,
    isUseIndent: themeStore.isUseIndent,
    isUseJustify: themeStore.isUseJustify,
    isCountStatus: themeStore.isCountStatus,
    isMacCodeBlock: themeStore.isMacCodeBlock,
    isShowLineNumber: themeStore.isShowLineNumber,
  })
}

// Theme change handlers
function themeChanged(newTheme: keyof typeof themeMap) {
  themeStore.theme = newTheme
  // 使用新主题系统
  themeStore.applyCurrentTheme()
  editorRefresh()
}

function fontChanged(fonts: string) {
  themeStore.fontFamily = fonts
  // 使用新主题系统
  themeStore.applyCurrentTheme()
  editorRefresh()
}

function sizeChanged(size: string) {
  themeStore.fontSize = size
  // 使用新主题系统
  themeStore.applyCurrentTheme()
  editorRefresh()
}

function colorChanged(newColor: string) {
  themeStore.primaryColor = newColor
  // 使用新主题系统
  themeStore.applyCurrentTheme()
  editorRefresh()
}

function codeBlockThemeChanged(newTheme: string) {
  themeStore.codeBlockTheme = newTheme
  editorRefresh()
}

function legendChanged(newVal: string) {
  themeStore.legend = newVal
  editorRefresh()
}

function macCodeBlockChanged() {
  themeStore.isMacCodeBlock = !themeStore.isMacCodeBlock
  editorRefresh()
}

function showLineNumberChanged() {
  themeStore.isShowLineNumber = !themeStore.isShowLineNumber
  editorRefresh()
}

function citeStatusChanged() {
  themeStore.isCiteStatus = !themeStore.isCiteStatus
  editorRefresh()
}

function useIndentChanged() {
  themeStore.isUseIndent = !themeStore.isUseIndent
  // 使用新主题系统
  themeStore.applyCurrentTheme()
  editorRefresh()
}

function useJustifyChanged() {
  themeStore.isUseJustify = !themeStore.isUseJustify
  // 使用新主题系统
  themeStore.applyCurrentTheme()
  editorRefresh()
}

// 公式设置变化处理函数
function inlineFormulaSizeChanged(value: string) {
  themeStore.inlineFormulaSize = value
  themeStore.applyCurrentTheme()
  editorRefresh()
}

function blockFormulaSizeChanged(value: string) {
  themeStore.blockFormulaSize = value
  themeStore.applyCurrentTheme()
  editorRefresh()
}

function formulaBackgroundChanged(value: string) {
  themeStore.formulaBackground = value
  themeStore.applyCurrentTheme()
  editorRefresh()
}

// 排版设置变化处理函数
function headingLineHeightChanged(value: string) {
  themeStore.headingLineHeight = value
  themeStore.applyCurrentTheme()
  editorRefresh()
}

function paragraphLineHeightChanged(value: string) {
  themeStore.paragraphLineHeight = value
  themeStore.applyCurrentTheme()
  editorRefresh()
}

function headingMarginTopChanged(value: string) {
  themeStore.headingMarginTop = value
  themeStore.applyCurrentTheme()
  editorRefresh()
}

function headingMarginBottomChanged(value: string) {
  themeStore.headingMarginBottom = value
  themeStore.applyCurrentTheme()
  editorRefresh()
}

function paragraphMarginTopChanged(value: string) {
  themeStore.paragraphMarginTop = value
  themeStore.applyCurrentTheme()
  editorRefresh()
}

function paragraphMarginBottomChanged(value: string) {
  themeStore.paragraphMarginBottom = value
  themeStore.applyCurrentTheme()
  editorRefresh()
}

// 样式快捷选项变化处理函数
function blockquoteBorderWidthChanged(value: string) {
  themeStore.blockquoteBorderWidth = value
  themeStore.applyCurrentTheme()
  editorRefresh()
}

function blockquoteBorderColorChanged(value: string) {
  themeStore.blockquoteBorderColor = value
  themeStore.applyCurrentTheme()
  editorRefresh()
}

function blockquoteBackgroundChanged(value: string) {
  themeStore.blockquoteBackground = value
  themeStore.applyCurrentTheme()
  editorRefresh()
}

function codeBorderRadiusChanged(value: string) {
  themeStore.codeBorderRadius = value
  themeStore.applyCurrentTheme()
  editorRefresh()
}

function tableBorderWidthChanged(value: string) {
  themeStore.tableBorderWidth = value
  themeStore.applyCurrentTheme()
  editorRefresh()
}

function tableBorderColorChanged(value: string) {
  themeStore.tableBorderColor = value
  themeStore.applyCurrentTheme()
  editorRefresh()
}

function resetStyleConfirm() {
  uiStore.isOpenConfirmDialog = true
}

// 控制是否启用动画
const enableAnimation = ref(false)

// 监听 RightSlider 开关状态变化
watch(isOpenRightSlider, () => {
  if (isMobile.value) {
    // 在移动端，用户操作时启用动画
    enableAnimation.value = true
  }
})

// 监听设备类型变化，重置动画状态
watch(isMobile, () => {
  enableAnimation.value = false
})

const isOpen = ref(false)

const addPostInputVal = ref(``)

watch(isOpen, () => {
  if (isOpen.value) {
    addPostInputVal.value = ``
  }
})

const pickColorsContainer = useTemplateRef<HTMLElement | undefined>(`pickColorsContainer`)
const format = ref<Format>(`rgb`)
const formatOptions = ref<Format[]>([`rgb`, `hex`, `hsl`, `hsv`])
</script>

<template>
  <!-- 移动端遮罩层 -->
  <div
    v-if="isMobile && isOpenRightSlider"
    class="fixed inset-0 bg-black/50 z-40"
    @click="isOpenRightSlider = false"
  />

  <div
    class="overflow-hidden mobile-right-drawer"
    :class="{
      // 移动端样式
      'fixed top-0 right-0 w-full h-full z-55 bg-background border-l shadow-lg': isMobile,
      'animate': isMobile && enableAnimation,
      // 桌面端样式
      'border-l-2 order-2 border-gray/20 bg-white transition-width duration-300 dark:bg-[#191919]': !isMobile,
      'w-100': !isMobile && isOpenRightSlider,
      'w-0 border-l-0': !isMobile && !isOpenRightSlider,
    }"
    :style="{
      transform: isMobile ? (isOpenRightSlider ? 'translateX(0)' : 'translateX(100%)') : 'none',
    }"
  >
    <div
      class="space-y-4 h-full overflow-auto p-4"
      :class="{
        // 移动端不需要额外的transform
        'pt-0': isMobile,
        // 桌面端保持原有的动画
        'transition-transform': !isMobile,
        'translate-x-0': !isMobile && isOpenRightSlider,
        'translate-x-full': !isMobile && !isOpenRightSlider,
      }"
    >
      <!-- 移动端标题栏 -->
      <div v-if="isMobile" class="sticky top-0 z-10 flex items-center justify-between -mx-4 px-4 py-3 border-b mb-4 bg-background">
        <h2 class="text-lg font-semibold">
          样式设置
        </h2>
        <Button variant="ghost" size="sm" @click="isOpenRightSlider = false">
          <X class="h-4 w-4" />
        </Button>
      </div>
      <div class="space-y-2">
        <h2>主题</h2>
        <div class="grid grid-cols-3 justify-items-center gap-2">
          <Button
            v-for="{ label, value } in themeOptions" :key="value" class="w-full" variant="outline" :class="{
              'border-black dark:border-white border-2': theme === value,
            }" @click="themeChanged(value)"
          >
            {{ label }}
          </Button>
        </div>
      </div>
      <div class="space-y-2">
        <h2>字体</h2>
        <div class="grid grid-cols-3 justify-items-center gap-2">
          <Button
            v-for="{ label, value } in fontFamilyOptions" :key="value" variant="outline" class="w-full"
            :class="{ 'border-black dark:border-white border-2': fontFamily === value }" @click="fontChanged(value)"
          >
            {{ label }}
          </Button>
        </div>
      </div>
      <div class="space-y-2">
        <h2>字号</h2>
        <div class="grid grid-cols-5 justify-items-center gap-2">
          <Button
            v-for="{ value, desc } in fontSizeOptions" :key="value" variant="outline" class="w-full" :class="{
              'border-black dark:border-white border-2': fontSize === value,
            }" @click="sizeChanged(value)"
          >
            {{ desc }}
          </Button>
        </div>
      </div>
      <div class="space-y-2">
        <h2>主题色</h2>
        <div class="grid grid-cols-3 justify-items-center gap-2">
          <Button
            v-for="{ label, value } in colorOptions" :key="value" class="w-full" variant="outline" :class="{
              'border-black dark:border-white border-2': primaryColor === value,
            }" @click="colorChanged(value)"
          >
            <span
              class="mr-2 inline-block h-4 w-4 rounded-full" :style="{
                background: value,
              }"
            />
            {{ label }}
          </Button>
        </div>
      </div>
      <div class="space-y-2">
        <h2>自定义主题色</h2>
        <div ref="pickColorsContainer">
          <PickColors
            v-if="pickColorsContainer" v-model:value="primaryColor" show-alpha :format="format"
            :format-options="formatOptions" :theme="isDark ? 'dark' : 'light'"
            :popup-container="pickColorsContainer" @change="colorChanged"
          />
        </div>
      </div>
      <div class="space-y-2">
        <h2>代码块主题</h2>
        <div>
          <Select v-model="codeBlockTheme" @update:model-value="codeBlockThemeChanged">
            <SelectTrigger>
              <SelectValue placeholder="Select a code block theme" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem v-for="{ label, value } in codeBlockThemeOptions" :key="label" :value="value">
                {{ label }}
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div class="space-y-2">
        <h2>图注格式</h2>
        <div class="grid grid-cols-3 justify-items-center gap-2">
          <Button
            v-for="{ label, value } in legendOptions" :key="value" class="w-full" variant="outline" :class="{
              'border-black dark:border-white border-2': legend === value,
            }" @click="legendChanged(value)"
          >
            {{ label }}
          </Button>
        </div>
      </div>

      <div class="space-y-2">
        <h2>Mac 代码块</h2>
        <div class="grid grid-cols-5 justify-items-center gap-2">
          <Button
            class="w-full" variant="outline" :class="{
              'border-black dark:border-white border-2': isMacCodeBlock,
            }" @click="!isMacCodeBlock && macCodeBlockChanged()"
          >
            开启
          </Button>
          <Button
            class="w-full" variant="outline" :class="{
              'border-black dark:border-white border-2': !isMacCodeBlock,
            }" @click="isMacCodeBlock && macCodeBlockChanged()"
          >
            关闭
          </Button>
        </div>
      </div>
      <div class="space-y-2">
        <h2>代码块行号</h2>
        <div class="grid grid-cols-5 justify-items-center gap-2">
          <Button
            class="w-full" variant="outline" :class="{
              'border-black dark:border-white border-2': isShowLineNumber,
            }" @click="!isShowLineNumber && showLineNumberChanged()"
          >
            开启
          </Button>
          <Button
            class="w-full" variant="outline" :class="{
              'border-black dark:border-white border-2': !isShowLineNumber,
            }" @click="isShowLineNumber && showLineNumberChanged()"
          >
            关闭
          </Button>
        </div>
      </div>

      <div class="space-y-2">
        <h2>微信外链转底部引用</h2>
        <div class="grid grid-cols-5 justify-items-center gap-2">
          <Button
            class="w-full" variant="outline" :class="{
              'border-black dark:border-white border-2': isCiteStatus,
            }" @click="!isCiteStatus && citeStatusChanged()"
          >
            开启
          </Button>
          <Button
            class="w-full" variant="outline" :class="{
              'border-black dark:border-white border-2': !isCiteStatus,
            }" @click="isCiteStatus && citeStatusChanged()"
          >
            关闭
          </Button>
        </div>
      </div>
      <div class="space-y-2">
        <h2>段落首行缩进</h2>
        <div class="grid grid-cols-5 justify-items-center gap-2">
          <Button
            class="w-full" variant="outline" :class="{
              'border-black dark:border-white border-2': isUseIndent,
            }" @click="!isUseIndent && useIndentChanged()"
          >
            开启
          </Button>
          <Button
            class="w-full" variant="outline" :class="{
              'border-black dark:border-white border-2': !isUseIndent,
            }" @click="isUseIndent && useIndentChanged()"
          >
            关闭
          </Button>
        </div>
      </div>
      <div class="space-y-2">
        <h2>段落两端对齐</h2>
        <div class="grid grid-cols-5 justify-items-center gap-2">
          <Button
            class="w-full" variant="outline" :class="{
              'border-black dark:border-white border-2': isUseJustify,
            }" @click="!isUseJustify && useJustifyChanged()"
          >
            开启
          </Button>
          <Button
            class="w-full" variant="outline" :class="{
              'border-black dark:border-white border-2': !isUseJustify,
            }" @click="isUseJustify && useJustifyChanged()"
          >
            关闭
          </Button>
        </div>
      </div>
      
      <!-- 公式设置 -->
      <div class="space-y-2">
        <h2>公式设置</h2>
        <div class="space-y-3">
          <div>
            <label class="text-sm font-medium">行内公式大小</label>
            <div class="grid grid-cols-5 justify-items-center gap-2 mt-1 mb-2">
              <Button
                v-for="size in ['0.9em', '1.0em', '1.1em', '1.2em', '1.3em']"
                :key="size"
                variant="outline"
                size="sm"
                class="w-full"
                :class="{
                  'border-black dark:border-white border-2': inlineFormulaSize === size,
                }"
                @click="inlineFormulaSizeChanged(size)"
              >
                {{ size }}
              </Button>
            </div>
            <div class="flex items-center gap-2">
              <Input
                v-model="inlineFormulaSize"
                placeholder="自定义，如: 1.15em"
                class="flex-1"
                @blur="inlineFormulaSizeChanged(inlineFormulaSize)"
              />
              <Button
                variant="outline"
                size="sm"
                @click="inlineFormulaSizeChanged(inlineFormulaSize)"
              >
                应用
              </Button>
            </div>
          </div>
          
          <div>
            <label class="text-sm font-medium">块级公式大小</label>
            <div class="grid grid-cols-5 justify-items-center gap-2 mt-1 mb-2">
              <Button
                v-for="size in ['0.95em', '1.05em', '1.15em', '1.25em', '1.35em']"
                :key="size"
                variant="outline"
                size="sm"
                class="w-full"
                :class="{
                  'border-black dark:border-white border-2': blockFormulaSize === size,
                }"
                @click="blockFormulaSizeChanged(size)"
              >
                {{ size }}
              </Button>
            </div>
            <div class="flex items-center gap-2">
              <Input
                v-model="blockFormulaSize"
                placeholder="自定义，如: 1.18em"
                class="flex-1"
                @blur="blockFormulaSizeChanged(blockFormulaSize)"
              />
              <Button
                variant="outline"
                size="sm"
                @click="blockFormulaSizeChanged(blockFormulaSize)"
              >
                应用
              </Button>
            </div>
          </div>
          
          <div>
            <label class="text-sm font-medium">公式背景色</label>
            <div class="grid grid-cols-3 justify-items-center gap-2 mt-1 mb-2">
              <Button
                v-for="color in ['rgba(0, 0, 0, 0.02)', 'rgba(0, 0, 0, 0.05)', 'rgba(0, 0, 0, 0.08)', 'rgba(59, 130, 246, 0.1)', 'rgba(16, 185, 129, 0.1)', 'transparent']"
                :key="color"
                variant="outline"
                size="sm"
                class="w-full"
                :class="{
                  'border-black dark:border-white border-2': formulaBackground === color,
                }"
                @click="formulaBackgroundChanged(color)"
              >
                <span
                  class="inline-block h-3 w-3 rounded-sm mr-1"
                  :style="{ background: color }"
                />
                {{ color === 'transparent' ? '透明' : '浅色' }}
              </Button>
            </div>
            <div class="flex items-center gap-2">
              <Input
                v-model="formulaBackground"
                placeholder="自定义，如: rgba(255, 99, 71, 0.1)"
                class="flex-1"
                @blur="formulaBackgroundChanged(formulaBackground)"
              />
              <Button
                variant="outline"
                size="sm"
                @click="formulaBackgroundChanged(formulaBackground)"
              >
                应用
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 排版设置 -->
      <div class="space-y-2">
        <h2>排版设置</h2>
        <div class="space-y-3">
          <div>
            <label class="text-sm font-medium">标题行高</label>
            <div class="grid grid-cols-5 justify-items-center gap-2 mt-1 mb-2">
              <Button
                v-for="height in ['1.0', '1.1', '1.2', '1.3', '1.4']"
                :key="height"
                variant="outline"
                size="sm"
                class="w-full"
                :class="{
                  'border-black dark:border-white border-2': headingLineHeight === height,
                }"
                @click="headingLineHeightChanged(height)"
              >
                {{ height }}
              </Button>
            </div>
            <div class="flex items-center gap-2">
              <Input
                v-model="headingLineHeight"
                placeholder="自定义，如: 1.25"
                class="flex-1"
                @blur="headingLineHeightChanged(headingLineHeight)"
              />
              <Button
                variant="outline"
                size="sm"
                @click="headingLineHeightChanged(headingLineHeight)"
              >
                应用
              </Button>
            </div>
          </div>
          
          <div>
            <label class="text-sm font-medium">正文行高</label>
            <div class="grid grid-cols-5 justify-items-center gap-2 mt-1 mb-2">
              <Button
                v-for="height in ['1.2', '1.3', '1.4', '1.5', '1.6']"
                :key="height"
                variant="outline"
                size="sm"
                class="w-full"
                :class="{
                  'border-black dark:border-white border-2': paragraphLineHeight === height,
                }"
                @click="paragraphLineHeightChanged(height)"
              >
                {{ height }}
              </Button>
            </div>
            <div class="flex items-center gap-2">
              <Input
                v-model="paragraphLineHeight"
                placeholder="自定义，如: 1.45"
                class="flex-1"
                @blur="paragraphLineHeightChanged(paragraphLineHeight)"
              />
              <Button
                variant="outline"
                size="sm"
                @click="paragraphLineHeightChanged(paragraphLineHeight)"
              >
                应用
              </Button>
            </div>
          </div>
          
          <div>
            <label class="text-sm font-medium">标题段前距</label>
            <div class="grid grid-cols-5 justify-items-center gap-2 mt-1 mb-2">
              <Button
                v-for="margin in ['1em', '1.5em', '2em', '2.5em', '3em']"
                :key="margin"
                variant="outline"
                size="sm"
                class="w-full"
                :class="{
                  'border-black dark:border-white border-2': headingMarginTop === margin,
                }"
                @click="headingMarginTopChanged(margin)"
              >
                {{ margin }}
              </Button>
            </div>
            <div class="flex items-center gap-2">
              <Input
                v-model="headingMarginTop"
                placeholder="自定义，如: 2.2em"
                class="flex-1"
                @blur="headingMarginTopChanged(headingMarginTop)"
              />
              <Button
                variant="outline"
                size="sm"
                @click="headingMarginTopChanged(headingMarginTop)"
              >
                应用
              </Button>
            </div>
          </div>
          
          <div>
            <label class="text-sm font-medium">标题段后距</label>
            <div class="grid grid-cols-5 justify-items-center gap-2 mt-1 mb-2">
              <Button
                v-for="margin in ['0.5em', '0.75em', '1em', '1.25em', '1.5em']"
                :key="margin"
                variant="outline"
                size="sm"
                class="w-full"
                :class="{
                  'border-black dark:border-white border-2': headingMarginBottom === margin,
                }"
                @click="headingMarginBottomChanged(margin)"
              >
                {{ margin }}
              </Button>
            </div>
            <div class="flex items-center gap-2">
              <Input
                v-model="headingMarginBottom"
                placeholder="自定义，如: 0.8em"
                class="flex-1"
                @blur="headingMarginBottomChanged(headingMarginBottom)"
              />
              <Button
                variant="outline"
                size="sm"
                @click="headingMarginBottomChanged(headingMarginBottom)"
              >
                应用
              </Button>
            </div>
          </div>
          
          <div>
            <label class="text-sm font-medium">正文段前距</label>
            <div class="grid grid-cols-5 justify-items-center gap-2 mt-1 mb-2">
              <Button
                v-for="margin in ['1em', '1.5em', '2em', '2.5em', '3em']"
                :key="margin"
                variant="outline"
                size="sm"
                class="w-full"
                :class="{
                  'border-black dark:border-white border-2': paragraphMarginTop === margin,
                }"
                @click="paragraphMarginTopChanged(margin)"
              >
                {{ margin }}
              </Button>
            </div>
            <div class="flex items-center gap-2">
              <Input
                v-model="paragraphMarginTop"
                placeholder="自定义，如: 1.8em"
                class="flex-1"
                @blur="paragraphMarginTopChanged(paragraphMarginTop)"
              />
              <Button
                variant="outline"
                size="sm"
                @click="paragraphMarginTopChanged(paragraphMarginTop)"
              >
                应用
              </Button>
            </div>
          </div>
          
          <div>
            <label class="text-sm font-medium">正文段后距</label>
            <div class="grid grid-cols-5 justify-items-center gap-2 mt-1 mb-2">
              <Button
                v-for="margin in ['1em', '1.5em', '2em', '2.5em', '3em']"
                :key="margin"
                variant="outline"
                size="sm"
                class="w-full"
                :class="{
                  'border-black dark:border-white border-2': paragraphMarginBottom === margin,
                }"
                @click="paragraphMarginBottomChanged(margin)"
              >
                {{ margin }}
              </Button>
            </div>
            <div class="flex items-center gap-2">
              <Input
                v-model="paragraphMarginBottom"
                placeholder="自定义，如: 1.2em"
                class="flex-1"
                @blur="paragraphMarginBottomChanged(paragraphMarginBottom)"
              />
              <Button
                variant="outline"
                size="sm"
                @click="paragraphMarginBottomChanged(paragraphMarginBottom)"
              >
                应用
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 样式快捷选项 -->
      <div class="space-y-2">
        <h2>样式快捷选项</h2>
        <div class="space-y-3">
          <div>
            <label class="text-sm font-medium">引用块边框宽度</label>
            <div class="grid grid-cols-4 justify-items-center gap-2 mt-1 mb-2">
              <Button
                v-for="width in ['2px', '3px', '4px', '5px']"
                :key="width"
                variant="outline"
                size="sm"
                class="w-full"
                :class="{
                  'border-black dark:border-white border-2': blockquoteBorderWidth === width,
                }"
                @click="blockquoteBorderWidthChanged(width)"
              >
                {{ width }}
              </Button>
            </div>
            <div class="flex items-center gap-2">
              <Input
                v-model="blockquoteBorderWidth"
                placeholder="自定义，如: 6px"
                class="flex-1"
                @blur="blockquoteBorderWidthChanged(blockquoteBorderWidth)"
              />
              <Button
                variant="outline"
                size="sm"
                @click="blockquoteBorderWidthChanged(blockquoteBorderWidth)"
              >
                应用
              </Button>
            </div>
          </div>
          
          <div>
            <label class="text-sm font-medium">引用块背景色</label>
            <div class="grid grid-cols-3 justify-items-center gap-2 mt-1 mb-2">
              <Button
                v-for="color in ['rgba(0, 0, 0, 0.02)', 'rgba(0, 0, 0, 0.05)', 'rgba(59, 130, 246, 0.1)', 'rgba(16, 185, 129, 0.1)', 'rgba(251, 146, 60, 0.1)', 'transparent']"
                :key="color"
                variant="outline"
                size="sm"
                class="w-full"
                :class="{
                  'border-black dark:border-white border-2': blockquoteBackground === color,
                }"
                @click="blockquoteBackgroundChanged(color)"
              >
                <span
                  class="inline-block h-3 w-3 rounded-sm mr-1"
                  :style="{ background: color }"
                />
                {{ color === 'transparent' ? '透明' : '背景' }}
              </Button>
            </div>
            <div class="flex items-center gap-2">
              <Input
                v-model="blockquoteBackground"
                placeholder="自定义，如: rgba(147, 51, 234, 0.08)"
                class="flex-1"
                @blur="blockquoteBackgroundChanged(blockquoteBackground)"
              />
              <Button
                variant="outline"
                size="sm"
                @click="blockquoteBackgroundChanged(blockquoteBackground)"
              >
                应用
              </Button>
            </div>
          </div>
          
          <div>
            <label class="text-sm font-medium">代码块圆角</label>
            <div class="grid grid-cols-4 justify-items-center gap-2 mt-1 mb-2">
              <Button
                v-for="radius in ['4px', '6px', '8px', '12px']"
                :key="radius"
                variant="outline"
                size="sm"
                class="w-full"
                :class="{
                  'border-black dark:border-white border-2': codeBorderRadius === radius,
                }"
                @click="codeBorderRadiusChanged(radius)"
              >
                {{ radius }}
              </Button>
            </div>
            <div class="flex items-center gap-2">
              <Input
                v-model="codeBorderRadius"
                placeholder="自定义，如: 16px"
                class="flex-1"
                @blur="codeBorderRadiusChanged(codeBorderRadius)"
              />
              <Button
                variant="outline"
                size="sm"
                @click="codeBorderRadiusChanged(codeBorderRadius)"
              >
                应用
              </Button>
            </div>
          </div>
          
          <div>
            <label class="text-sm font-medium">表格边框宽度</label>
            <div class="grid grid-cols-4 justify-items-center gap-2 mt-1 mb-2">
              <Button
                v-for="width in ['1px', '2px', '3px', '4px']"
                :key="width"
                variant="outline"
                size="sm"
                class="w-full"
                :class="{
                  'border-black dark:border-white border-2': tableBorderWidth === width,
                }"
                @click="tableBorderWidthChanged(width)"
              >
                {{ width }}
              </Button>
            </div>
            <div class="flex items-center gap-2">
              <Input
                v-model="tableBorderWidth"
                placeholder="自定义，如: 1.5px"
                class="flex-1"
                @blur="tableBorderWidthChanged(tableBorderWidth)"
              />
              <Button
                variant="outline"
                size="sm"
                @click="tableBorderWidthChanged(tableBorderWidth)"
              >
                应用
              </Button>
            </div>
          </div>
          
          <div>
            <label class="text-sm font-medium">表格边框颜色</label>
            <div class="grid grid-cols-3 justify-items-center gap-2 mt-1 mb-2">
              <Button
                v-for="color in ['#dfdfdf', '#e0e0e0', '#d0d0d0', '#bbb', '#999', '#666']"
                :key="color"
                variant="outline"
                size="sm"
                class="w-full"
                :class="{
                  'border-black dark:border-white border-2': tableBorderColor === color,
                }"
                @click="tableBorderColorChanged(color)"
              >
                <span
                  class="inline-block h-3 w-3 rounded-sm mr-1 border"
                  :style="{ borderColor: color }"
                />
                边框
              </Button>
            </div>
            <div class="flex items-center gap-2">
              <Input
                v-model="tableBorderColor"
                placeholder="自定义，如: #ccc"
                class="flex-1"
                @blur="tableBorderColorChanged(tableBorderColor)"
              />
              <Button
                variant="outline"
                size="sm"
                @click="tableBorderColorChanged(tableBorderColor)"
              >
                应用
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <div class="space-y-2">
        <h2>样式配置</h2>
        <Button variant="destructive" @click="resetStyleConfirm">
          重置
        </Button>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 移动端右侧栏动画 - 只有添加了 animate 类才启用 */
.mobile-right-drawer.animate {
  transition: transform 300ms cubic-bezier(0.16, 1, 0.3, 1);
}
</style>
