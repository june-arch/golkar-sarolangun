import { tableAdmin } from "@/lib/resource/table-admin";
import { MemberItem } from "./table-item/member-item";
import { RegionItem } from "./table-item/region-item";


export const Table = ({ title }: {title : string}) => {
    return (
      <div className="">
        {title == tableAdmin.MEMBER && <MemberItem title={title} />}
        {title == tableAdmin.REGION && <RegionItem title={title} />}
      </div>
    );
};