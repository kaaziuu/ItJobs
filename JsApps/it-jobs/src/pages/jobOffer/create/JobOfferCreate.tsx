import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { history } from "../../..";
import CenterContainer from "../../../layout/common/CenterContainer";
import CreateUpdateJobOfferRequest from "../../../service/jobOffer/dto/CreateUpdateJobOfferRequest";
import { UseStore } from "../../../stores/Store";
import CreateClass from "../../../utils/common/CreateClass";
import Path, { GetUrl } from "../../../utils/route/Path";
import JobOfferCreateUpdateForm from "../common/JobOfferCreateUpdateForm";

const JobOfferCreate = () => {
    const { companyStore, jobOfferStore } = UseStore();
    const [form, setForm] = useState<CreateUpdateJobOfferRequest>({
        description: "",
        maximumSalary: 0,
        minimumSalary: 0,
        position: "",
        email: "",
    });
    const [isInvalid, setIsInvalid] = useState(false);
    const [cookie] = useCookies(["token"]);
    const baseClass = "create-update-job-offer";

    useEffect(() => {
        companyStore.fetchMyCompany(cookie.token);
    }, [companyStore, jobOfferStore, cookie.token]);

    const createJobOffer = async () => {
        await jobOfferStore.createJobOffer(form, cookie.token);
        if (!!!jobOfferStore.error) {
            setIsInvalid(false);
            history.push(GetUrl(Path.jobOfferDetails, jobOfferStore.getChoosedJobOffer!.uuid, "uuid"));
        } else {
            setIsInvalid(true);
        }
    };

    if (companyStore.isLoading || !companyStore.getIsCompanyLoaded || jobOfferStore.isLoading) {
        return <h1>loading...</h1>;
    }

    if (companyStore.getIsCompanyLoaded && companyStore.getCompany === undefined) {
        history.push(Path.createCompany);
        return <></>;
    }

    return (
        <CenterContainer containerClass={CreateClass("container", baseClass)}>
            <JobOfferCreateUpdateForm
                baseClass={baseClass}
                form={form}
                isInvalid={isInvalid}
                setForm={setForm}
                submit={createJobOffer}
                title="Create a job offer"
                error={jobOfferStore.getError}
                submitText="create job offer"
            />
        </CenterContainer>
    );
};

export default observer(JobOfferCreate);
