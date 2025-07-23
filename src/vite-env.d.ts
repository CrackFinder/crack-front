/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string
  readonly VITE_BASE_URL: string
  readonly VITE_APP_TITLE: string
  readonly VITE_KAKAO_MAP_KEY: string
  readonly VITE_ENV: 'development' | 'production'
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
