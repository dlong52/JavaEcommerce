import React, { useMemo } from 'react'
import './style.css'
const LayzyLoad = () => {
  return (
    <div
      className="h-1/2 aspect-square animate-spin rounded-full border-2 border-solid border-current border-e-transparent  text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
      role="status">
    </div>
  )
}
export default LayzyLoad
