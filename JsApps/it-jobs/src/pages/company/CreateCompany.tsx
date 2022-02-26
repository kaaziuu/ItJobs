import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useCookies } from "react-cookie";
import { history } from "../..";
import CenterContainer from "../../layout/common/CenterContainer";
import FormGroup from "../../layout/form/FormGroup";
import FormHeader from "../../layout/form/FormHeader";
import FormTextAreaGroup from "../../layout/form/FormTextAreaGroup";
import CreateUpdateCompanyRequest from "../../service/company/dto/CreateUpdateCompanyRequest";
import { UseStore } from "../../stores/Store";
import CreateClass from "../../utils/common/CreateClass";
import Path from "../../utils/route/Path";

const CreateCompany: React.FC = () => {
    const { companyStore } = UseStore();
    const [isInvalid, setIsInvalid] = useState<boolean>(false);
    const [name, setName] = useState<string>("");
    const [size, setSize] = useState<string>("0");
    const [motto, setMotto] = useState<string | null>(null);
    const [description, setDescription] = useState<string>("");
    const [cookie] = useCookies(["token"]);
    const baseClass = "create-update-company";

    const createCompany = async () => {
        const createForm = {
            description: description,
            name: name,
            size: parseInt(size),
            motto: motto,
        } as CreateUpdateCompanyRequest;
        await companyStore.createCompany(createForm, cookie.token);
        if (!!!companyStore.error) {
            setIsInvalid(false);
            history.push(Path.myComany);
        } else {
            setIsInvalid(true);
        }
    };

    return (
        <CenterContainer containerClass={CreateClass("container", baseClass)}>
            <Form className={CreateClass(baseClass, "form")}>
                <FormHeader baseClass={baseClass} title="Create Company" />
                <FormGroup
                    baseClass={baseClass}
                    isInvalid={isInvalid}
                    isRequired={true}
                    labelText="Name"
                    onChange={setName}
                    typeInput="text"
                    placeholder="name"
                />
                <FormGroup
                    baseClass={baseClass}
                    isInvalid={isInvalid}
                    isRequired={true}
                    labelText="Company size"
                    onChange={setSize}
                    typeInput="number"
                    placeholder="Company size"
                />
                <FormGroup
                    baseClass={baseClass}
                    isInvalid={isInvalid}
                    isRequired={true}
                    labelText="Company motto"
                    onChange={setMotto}
                    typeInput="text"
                    placeholder="motto"
                />
                <FormTextAreaGroup
                    baseClass={baseClass}
                    isInvalid={isInvalid}
                    isRequired={true}
                    labelText="Description"
                    onChange={setDescription}
                    typeInput="text"
                    placeholder="description"
                    feedbackText={companyStore.error}
                />
                <Form.Group className={CreateClass(baseClass, "group")}>
                    <Button
                        variant="primary"
                        type="button"
                        onClick={createCompany}
                        className={CreateClass(baseClass, "submit")}
                    >
                        Create Company
                    </Button>
                </Form.Group>
            </Form>
        </CenterContainer>
    );
};

export default CreateCompany;
