import { getCurrentUser } from "./actions/getCurrentUser";
import getListings from "./actions/getListings";
import Container from "./components/Container";
import EmptyState from "./components/EmptyState";
import ListingCard from "./components/listings/ListingCard";

async function HomePage() {
  const listings = await getListings();
  const currentUser: any = await getCurrentUser();

  const isEmpty = listings && listings.length === 0;

  if (isEmpty) {
    return <EmptyState showReset={isEmpty} />;
  }

  return (
    <Container>
      <div className="grid grid-cols-1 gap-8 pt-24 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {listings?.map(listing => (
          <ListingCard
            key={listing.id}
            data={listing}
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  );
}

export default HomePage;
