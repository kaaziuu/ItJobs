import { Form } from "react-bootstrap";
import CreateClass from "../../utils/common/CreateClass";

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

const FormTextAreaGroup: React.FC<props> = (prop) => {
    return (
        <Form.Group className={CreateClass(prop.baseClass, "group")}>
            <Form.Label className={CreateClass(prop.baseClass, "label")}>{prop.labelText}</Form.Label>
            <Form.Control
                as="textarea"
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

FormTextAreaGroup.defaultProps = {
    disable: false,
};
export default FormTextAreaGroup;
