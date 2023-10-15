import { Loader } from "rsuite";
import { RequestStatus } from "../../Entities/RequestStatus";
import { PropsWithChildren } from "react";

const Switcher = (
  props: PropsWithChildren<{ status: RequestStatus }>
) : JSX.Element => {
  

  switch (props.status) {
    case RequestStatus.LOADING:
      return (
        <>
          <Loader />
          Loading...
        </>
      );
    case RequestStatus.ERROR:
      return <>Error!</>;
    default:
      return <>{props.children}</>;
  }

};

export default Switcher;