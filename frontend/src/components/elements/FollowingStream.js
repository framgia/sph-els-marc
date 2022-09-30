import FollowingCard from "./FollowingCard";

const FollowingStream = (following) => {
  return (
    <>
      <div className="col-12 col-lg-6">
        <section className="py-6">
          <div className="container">
            <div className="position-relative p-8 border rounded-2">
              <h3> Following </h3>
              <FollowingCard following={following.following} />
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default FollowingStream;
