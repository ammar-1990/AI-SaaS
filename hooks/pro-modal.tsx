import { create } from 'zustand'

type ProProps = {
isOpen:boolean,
onOpen:()=>void
onClose:()=>void
}

const useProModal = create<ProProps>()((set) => ({
  isOpen:false,
  onOpen: () => set({ isOpen:true }),
  onClose:()=>set({isOpen:false})
}))


export default useProModal

