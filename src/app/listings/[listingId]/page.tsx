import { getCurrentUser } from "@/app/actions/getCurrentUser";
import { getListingById } from "@/app/actions/getListingById";
import EmptyState from "@/app/components/EmptyState";
import ListingClient from "@/app/components/listings/ListingClient";
import { SafeListing, SafeUser } from "@/app/types";

type ListingPageProps = {
  listingId: string;
};

async function ListingPage({ params }: { params: ListingPageProps }) {
  const listing = (await getListingById(params)) as SafeListing & {
    user: SafeUser;
  };
  const currentUser: any = await getCurrentUser();

  if (!listing) {
    return <EmptyState />;
  }

  return <ListingClient listing={listing} currentUser={currentUser} />;
}

export default ListingPage;
