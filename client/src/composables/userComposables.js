// mouse.js
import { ref, onMounted, onUnmounted } from 'vue'

// by convention, composable function names start with "use"
export function useUsername(props) {
  const username = props.user?.username
  return { username }
}

export function useEmail(props) {
  const email = props.user?.username
  return { username: email }
}

export function useCreatedAt(props) {
  const username = props.user?.username
  return { username }
}