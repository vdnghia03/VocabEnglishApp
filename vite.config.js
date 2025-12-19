import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // THAY 'ten-repository-cua-ban' BẰNG TÊN REPO TRÊN GITHUB CỦA BẠN
  // Ví dụ: nếu link repo là github.com/user/hoc-tieng-anh => để là '/hoc-tieng-anh/'
  base: '/VocabEnglishApp/', 
})