import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { UseStore } from "../../../stores/Store";
import { JobOfferParam } from "../../../utils/route/Path";

const JobOfferDetails = () => {
    const { uuid } = useParams<JobOfferParam>();
    const { jobOfferStore } = UseStore();

    useEffect(() => {
        jobOfferStore.chooseJobOffer(uuid);
    }, [jobOfferStore]);

    if (jobOfferStore.isLoading) {
        return <h1>loading...</h1>;
    }

    if (jobOfferStore.getError !== undefined) {
        return <h1>{jobOfferStore.getError}</h1>;
    }

    return <h1>{jobOfferStore.getChoosedJobOffer?.position}</h1>;
};

export default observer(JobOfferDetails);
