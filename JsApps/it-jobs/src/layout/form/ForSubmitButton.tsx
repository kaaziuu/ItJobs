import { Button, Form } from "react-bootstrap";
import CreateClass from "../../utils/common/CreateClass";

interface props {
    baseClass: string;
    text: string;
    onClick: () => Promise<void>;
}

const FormSubmitButton = ({ onClick, text, baseClass }: props) => (
    <Form.Group className={CreateClass(baseClass, "group")}>
        <Button variant="primary" type="button" onClick={onClick} className={CreateClass(baseClass, "submit")}>
            {text}
        </Button>
    </Form.Group>
);

export default FormSubmitButton;
