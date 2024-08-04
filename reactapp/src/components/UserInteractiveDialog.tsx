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
}

const UserInteractiveDialog  = ({isOpen, title, closeDialog, description, children}: UserInteractiveDialogProps) =>{
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
                <Button type="submit">Save changes</Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
  )
}


export default UserInteractiveDialog;