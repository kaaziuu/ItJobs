import { observer } from "mobx-react-lite";
import { Form } from "react-bootstrap";
import FormGroup from "../../../layout/form/FormGroup";
import FormHeader from "../../../layout/form/FormHeader";
import FormSubmitButton from "../../../layout/form/ForSubmitButton";
import CreateUpdateJobOfferRequest from "../../../service/jobOffer/dto/CreateUpdateJobOfferRequest";
import CreateClass from "../../../utils/common/CreateClass";

interface props {
    title: string;
    form: CreateUpdateJobOfferRequest;
    setForm: (value: CreateUpdateJobOfferRequest) => void;
    baseClass: string;
    isInvalid: boolean;
    error?: string;
    submit: () => Promise<void>;
    submitText: string;
}

const JobOfferCreateUpdate = ({ title, form, setForm, baseClass, isInvalid, error, submit, submitText }: props) => (
    <Form className={CreateClass(baseClass, "form")}>
        <FormHeader baseClass={baseClass} title={title} />
        <FormGroup
            baseClass={baseClass}
            isInvalid={isInvalid}
            isRequired={true}
            labelText="Position:"
            typeInput="text"
            placeholder="position"
            onChange={(value: string) => setForm({ ...form, position: value })}
            value={form.position}
        />
        <FormGroup
            baseClass={baseClass}
            isInvalid={isInvalid}
            isRequired={true}
            labelText="Description:"
            as="textarea"
            typeInput="text"
            placeholder="description"
            onChange={(value: string) => setForm({ ...form, description: value })}
            value={form.description}
        />
        <FormGroup
            baseClass={baseClass}
            isInvalid={isInvalid}
            isRequired={true}
            labelText="Email: "
            typeInput="email"
            placeholder="email"
            onChange={(value: string) => setForm({ ...form, email: value })}
            value={form.email}
        />
        <FormGroup
            baseClass={baseClass}
            isInvalid={isInvalid}
            isRequired={true}
            labelText="Minimum salary in Euro:"
            typeInput="number"
            placeholder="minimum salary"
            onChange={(value: string) => setForm({ ...form, minimumSalary: parseInt(value) })}
            value={form.minimumSalary.toString()}
        />
        <FormGroup
            baseClass={baseClass}
            isInvalid={isInvalid}
            isRequired={true}
            labelText="Maximum salary in Euro:"
            typeInput="number"
            placeholder="maximum salary"
            onChange={(value: string) => setForm({ ...form, maximumSalary: parseInt(value) })}
            feedbackText={error}
            value={form.maximumSalary.toString()}
        />
        <FormSubmitButton text={submitText} baseClass={baseClass} onClick={submit} />
    </Form>
);

export default observer(JobOfferCreateUpdate);
