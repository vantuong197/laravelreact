import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

 
interface UserInteractiveDialogProps {
    isOpen: boolean,
    title: string | null,
    closeDialog: () => void,
    description: string | null
    children: any
    btnName: string
}

const UserInteractiveDialog  = ({isOpen, title, closeDialog, description, children, btnName}: UserInteractiveDialogProps) =>{
  return (
    <Dialog open={isOpen} onOpenChange={closeDialog}>
        <DialogContent className="w-2/3 max-w-full">
            <DialogHeader>
                <DialogTitle>{title}</DialogTitle>
                <DialogDescription>
                        {description}
                </DialogDescription>
            </DialogHeader>
            {children}
            <DialogFooter>
                <Button type="submit">{btnName}</Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
  )
}


export default UserInteractiveDialog;