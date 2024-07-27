import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
  } from "@/components/ui/alert-dialog"

interface CustomizeAlertDialogProps {
    isOpen: boolean,
    closeDialog: () => void,
    confirmAction: ()=>void
}
const CustomizeAlertDialog = ({isOpen, closeDialog, confirmAction}: CustomizeAlertDialogProps) =>{
    return (
        <AlertDialog open={isOpen}>
            <AlertDialogContent>
                <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                    This action cannot be undone. This will permanently remove your data from our servers.
                </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                <AlertDialogCancel onClick={closeDialog}>Cancel</AlertDialogCancel>
                <AlertDialogAction className="bg-[#04AA6D]" onClick={confirmAction}>Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}


export default CustomizeAlertDialog;