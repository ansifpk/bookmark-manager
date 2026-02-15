import { Button } from "./ui/button"

const Btn = ({text,className,onClick}:{text:string,className:string,onClick:any}) => {
  return (
    <Button onClick={onClick} className={className}>
      {text}
    </Button>
  )
}

export default Btn
