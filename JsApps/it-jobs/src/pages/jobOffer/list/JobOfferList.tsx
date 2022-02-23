import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { UseStore } from "../../../stores/Store";
import CreateClass from "../../../utils/components/CreateClass";
import JobOfferCard from "../common/JobOfferCard";

const JobOfferList = () => {
    const { jobOfferStore } = UseStore();
    const baseClass = "job-offer-list";

    useEffect(() => {
        jobOfferStore.fetchAllJobOffes();
    }, [jobOfferStore]);

    if (jobOfferStore.isLoading) {
        return <h1>loading...</h1>;
    }

    return (
        <Container className={CreateClass(baseClass, "container")}>
            <Row xs={1} md={3} className={CreateClass(baseClass, "row")}>
                {jobOfferStore.getJobOffers.map((x) => (
                    <Col key={x.uuid} className={CreateClass(baseClass, "col")}>
                        <JobOfferCard jobOffer={x} baseClass={baseClass} />
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default observer(JobOfferList);
