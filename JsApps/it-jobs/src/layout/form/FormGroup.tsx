import { Form } from "react-bootstrap";
import CreateClass from "../../utils/components/CreateClass";

interface props {
    baseClass: string;
    labelText: string;
    typeInput: "text" | "password" | "number";
    onChange: (value: string) => void;
    isRequired: boolean;
    isInvalid: boolean;
    placeholder: string;
    feedbackText?: string;
    disable?: boolean;
    value?: string;
}

const FormGroup: React.FC<props> = (prop) => {
    return (
        <Form.Group className={CreateClass(prop.baseClass, "group")}>
            <Form.Label className={CreateClass(prop.baseClass, "label")}>{prop.labelText}</Form.Label>
            <Form.Control
                className={CreateClass(prop.baseClass, "input")}
                type={prop.typeInput}
                onChange={(e) => prop.onChange(e.target.value)}
                required={prop.isRequired}
                isInvalid={prop.isInvalid}
                placeholder={prop.placeholder}
                disabled={prop.disable}
                value={prop.value}
            />
            {prop.feedbackText ? (
                <Form.Control.Feedback type="invalid">{prop.feedbackText!}</Form.Control.Feedback>
            ) : null}
        </Form.Group>
    );
};

FormGroup.defaultProps = {
    disable: false,
};

export default FormGroup;
