import { Form } from "react-bootstrap";
import CreateClass from "../../utils/common/CreateClass";

interface props {
    baseClass: string;
    title: string;
}

const FormHeader: React.FC<props> = (prop) => {
    return (
        <Form.Group className={CreateClass(prop.baseClass, "group", [CreateClass(prop.baseClass, "group-title")])}>
            <Form.Label className={CreateClass(prop.baseClass, "title")}>
                <h1>{prop.title}</h1>
            </Form.Label>
        </Form.Group>
    );
};

export default FormHeader;
