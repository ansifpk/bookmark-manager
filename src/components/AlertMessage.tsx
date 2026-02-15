import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { CheckCircle, Trash2Icon } from "lucide-react";
import Btn from "./Btn";

const AlertMessage = ({
  open,
  description,
  handleSubmit,
  handleCancel,
}: {
  open: boolean;
  description: string;
  handleSubmit: () => void;
  handleCancel: () => void;
}) => {
  return (
    <AlertDialog open={open}>
      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          {description ==
          "This will Permanantly remove this BookMark from our server." ? (
            <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
              <Trash2Icon />
            </AlertDialogMedia>
          ) : (
            <AlertDialogMedia className="bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400">
              <CheckCircle />
            </AlertDialogMedia>
          )}

          <AlertDialogTitle>Are Yo Sure?</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <Btn text="Cancel" className="bg-gray-700" onClick={handleCancel} />
          <Btn
            text={
              description ==
              "This will Permanantly remove this BookMark from our server."
                ? "Delete"
                : "Save"
            }
            className={
              description ==
              "This will Permanantly remove this BookMark from our server."
                ? "bg-red-200 text-red-600 dark:bg-red-900/30 dark:text-red-400 cursor-pointer hover:bg-red-300"
                : "bg-green-200 text-green-600 dark:bg-green-900/30 dark:text-green-400 cursor-pointer hover:bg-green-300"
            }
            onClick={handleSubmit}
          />
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AlertMessage;
