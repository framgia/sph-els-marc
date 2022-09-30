import FollowerCard from "./FollowerCard";

const FollowerStream = (followers) => {
  return (
    <>
      <div className="col-12 col-lg-6">
        <section className="py-6">
          <div className="container">
            <div className="position-relative p-8 border rounded-2">
              <h3> Followers </h3>
              {/** Here */}
              <FollowerCard followers={followers.followers} />
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default FollowerStream;
