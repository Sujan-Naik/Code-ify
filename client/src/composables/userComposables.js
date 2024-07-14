// mouse.js
import { ref, onMounted, onUnmounted } from 'vue'

// by convention, composable function names start with "use"
export function useUsername(props) {
  // state encapsulated and managed by the composable

  const username = props.user?.username

  return { username }
}

