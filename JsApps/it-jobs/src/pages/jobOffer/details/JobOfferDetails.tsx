import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Button, Card } from "react-bootstrap";
import { CurrencyEuro } from "react-bootstrap-icons";
import { useParams } from "react-router-dom";
import { history } from "../../..";
import CenterContainer from "../../../layout/common/CenterContainer";
import { UseStore } from "../../../stores/Store";
import CreateClass from "../../../utils/common/CreateClass";
import DateFormat from "../../../utils/common/DateFormat";
import Path, { GetUrl, JobOfferParam } from "../../../utils/route/Path";

const JobOfferDetails = () => {
    const { uuid } = useParams<JobOfferParam>();
    const { jobOfferStore, userStore } = UseStore();
    const baseClass = "job-offer";

    useEffect(() => {
        jobOfferStore.chooseJobOffer(uuid);
    }, [jobOfferStore, uuid]);

    if (jobOfferStore.isLoading) {
        return <h1>loading...</h1>;
    }

    if (jobOfferStore.getError !== undefined || jobOfferStore.getChoosedJobOffer === undefined) {
        return <h1>{jobOfferStore.getError ? jobOfferStore.getError : "not found"}</h1>;
    }

    const jobOffer = jobOfferStore.getChoosedJobOffer;
    const company = jobOffer!.company;
    const isOwner = userStore.getUser.company?.id === company.id;
    return (
        <>
            <CenterContainer containerClass={CreateClass(baseClass, "offer", [baseClass])}>
                <Card className={CreateClass(baseClass, "card")}>
                    <Card.Header className={CreateClass(baseClass, "card-header")}>
                        <h1>{jobOffer!.position}</h1>
                        {DateFormat(jobOffer.createAt)}
                        <h5>
                            Pay scale from {jobOffer?.minimumSalary} <CurrencyEuro /> to {jobOffer?.maximumSalary}
                            <CurrencyEuro />
                        </h5>
                    </Card.Header>
                    <Card.Body>
                        <Card.Title>Do you want to join to us? Write to us {jobOffer?.email}</Card.Title>
                        <Card.Text>{jobOffer?.description}</Card.Text>
                        {isOwner ? (
                            <Button
                                variant="secondary"
                                onClick={() => history.push(GetUrl(Path.jobOfferUpdate, jobOffer.uuid, "uuid"))}
                            >
                                Update
                            </Button>
                        ) : null}
                    </Card.Body>
                </Card>
            </CenterContainer>
            <CenterContainer containerClass={CreateClass(baseClass, "company", [baseClass])}>
                <h4 className={CreateClass(baseClass, "company-section-header")}>About us</h4>
                <Card className={CreateClass(baseClass, "card")}>
                    <Card.Header className={CreateClass(baseClass, "card-header")}>
                        <h1>{company.name}</h1>
                        {company.motto ? <h5>{company.motto}</h5> : null}
                    </Card.Header>
                    <Card.Body>
                        <Card.Title>Size of comapny: {company!.size}</Card.Title>
                        <Card.Text>{company!.description}</Card.Text>
                    </Card.Body>
                </Card>
            </CenterContainer>
        </>
    );
};

export default observer(JobOfferDetails);
