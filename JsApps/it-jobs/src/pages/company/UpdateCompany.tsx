import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useCookies } from "react-cookie";
import { history } from "../..";
import CenterContainer from "../../layout/common/CenterContainer";
import FormGroup from "../../layout/form/FormGroup";
import FormHeader from "../../layout/form/FormHeader";
import FormTextAreaGroup from "../../layout/form/FormTextAreaGroup";
import CreateUpdateCompanyRequest from "../../service/company/dto/CreateUpdateCompanyRequest";
import { UseStore } from "../../stores/Store";
import CreateClass from "../../utils/components/CreateClass";
import Path from "../../utils/route/Path";

const UpdateCompany = () => {
    const { companyStore } = UseStore();
    const [name, setName] = useState<string>("");
    const [size, setSize] = useState<string>("0");
    const [motto, setMotto] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [isInvalid, setIsInvalid] = useState<boolean>(false);
    const [cookie] = useCookies(["token"]);
    const baseClass = "create-company";

    const updateCompany = async () => {
        const updateForm = {
            description: description,
            name: name,
            size: parseInt(size),
            motto: motto,
        } as CreateUpdateCompanyRequest;

        await companyStore.updateCompany(updateForm, cookie.token);
        if (!!!companyStore.error) {
            setIsInvalid(false);
            history.push(Path.myComany);
        } else {
            setIsInvalid(true);
        }
    };

    const fetchMyCompany = async () => {
        await companyStore.fetchMyCompany(cookie.token);
        setName(companyStore.getCompany!.name);
        setDescription(companyStore.getCompany!.description);
        setMotto(companyStore.getCompany!.motto ? companyStore.getCompany!.motto : "");
        setSize(companyStore.getCompany!.size);
    };

    useEffect(() => {
        fetchMyCompany();
    }, [companyStore]);

    if (companyStore.isLoading || !companyStore.getIsCompanyLoaded) {
        return <h1>loading</h1>;
    }

    if (companyStore.getIsCompanyLoaded && companyStore.getCompany === undefined) {
        history.push(Path.createCompany);
        return <></>;
    }

    return (
        <CenterContainer containerClass={CreateClass("container", baseClass)}>
            <Form className={CreateClass(baseClass, "form")}>
                <FormHeader baseClass={baseClass} title="Update Company" />
                <FormGroup
                    baseClass={baseClass}
                    isInvalid={isInvalid}
                    isRequired={true}
                    labelText="Name"
                    onChange={setName}
                    typeInput="text"
                    placeholder="name"
                    value={name}
                />
                <FormGroup
                    baseClass={baseClass}
                    isInvalid={isInvalid}
                    isRequired={true}
                    labelText="Company size"
                    onChange={setSize}
                    typeInput="number"
                    placeholder="Company size"
                    value={size}
                />
                <FormGroup
                    baseClass={baseClass}
                    isInvalid={isInvalid}
                    isRequired={true}
                    labelText="Company motto"
                    onChange={setMotto}
                    typeInput="text"
                    placeholder="motto"
                    value={motto}
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
                    value={description}
                />
                <Form.Group className={CreateClass(baseClass, "group")}>
                    <Button
                        variant="primary"
                        type="button"
                        onClick={updateCompany}
                        className={CreateClass(baseClass, "submit")}
                    >
                        Update Company
                    </Button>
                </Form.Group>
            </Form>
        </CenterContainer>
    );
};

export default observer(UpdateCompany);
