import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useParams } from "react-router-dom";
import { history } from "../../..";
import CenterContainer from "../../../layout/common/CenterContainer";
import CreateUpdateJobOfferRequest from "../../../service/jobOffer/dto/CreateUpdateJobOfferRequest";
import { UseStore } from "../../../stores/Store";
import CreateClass from "../../../utils/common/CreateClass";
import Path, { GetUrl, JobOfferParam } from "../../../utils/route/Path";
import JobOfferCreateUpdateForm from "../common/JobOfferCreateUpdateForm";

const JobOfferUpdate = () => {
    const { uuid } = useParams<JobOfferParam>();
    const { jobOfferStore, userStore } = UseStore();
    const baseClass = "create-update-job-offer";
    const [cookie] = useCookies(["token"]);
    const [isInvalid, setIsInvalid] = useState(false);
    const [form, setForm] = useState<CreateUpdateJobOfferRequest>({
        description: "",
        maximumSalary: 0,
        minimumSalary: 0,
        position: "",
        email: "",
    });

    const updateJobOffer = async () => {
        await jobOfferStore.updateJobOffer(form, uuid, cookie.token);
        if (!!jobOfferStore.error) {
            setIsInvalid(true);
        } else {
            setIsInvalid(false);
            history.push(GetUrl(Path.jobOfferDetails, uuid, "uuid"));
        }
    };

    const fetchJobOffer = async () => {
        await jobOfferStore.chooseJobOffer(uuid);
        const jobOffer = jobOfferStore.getChoosedJobOffer!;
        setForm({
            description: jobOffer.description,
            email: jobOffer.email,
            maximumSalary: jobOffer.maximumSalary,
            minimumSalary: jobOffer.minimumSalary,
            position: jobOffer.position,
        });
    };

    useEffect(() => {
        fetchJobOffer();
    }, [jobOfferStore, cookie.token, uuid]);

    if (jobOfferStore.isLoading) {
        return <h1>loading...</h1>;
    }

    if (jobOfferStore.getChoosedJobOffer === undefined) {
        return <h1>not found</h1>;
    }

    const jobOffer = jobOfferStore.getChoosedJobOffer!;

    if (jobOffer.company.id !== userStore.getUser.company?.id) {
        history.push(GetUrl(Path.jobOfferDetails, jobOffer.uuid, "uuid"));
        return <></>;
    }

    return (
        <CenterContainer containerClass={CreateClass("container", baseClass)}>
            <JobOfferCreateUpdateForm
                title="Update job offer"
                baseClass={baseClass}
                form={form}
                isInvalid={isInvalid}
                setForm={setForm}
                error={jobOfferStore.getError}
                submit={updateJobOffer}
                submitText="Update job offer"
            />
        </CenterContainer>
    );
};

export default observer(JobOfferUpdate);
