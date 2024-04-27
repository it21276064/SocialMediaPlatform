import React, { useEffect } from "react";
import "../../Styles/center_section.css";
import TobBox from "./TobBox";
import MyPost from "./MyPost";
import FriendsPost from "./FriendsPost";
import { useSnapshot } from "valtio";
import state from "../../Utils/Store";
import PostService from "../../Services/PostService";
import CreateWorkoutPlanBox from "./CreateWorkoutPlanBox";
import WorkoutPlanCard from "./WorkoutPlanCard";
import CreaetMealPlanBox from "./CreaetMealPlanBox";
import MealPlanCard from "./MealPlanCard";
import FriendsSection from "./FriendsSection";

const CenterSection = () => {
  // Accessing the global state using useSnapshot from valtio
  const snap = useSnapshot(state);

  // useEffect hook to fetch posts when the component mounts
  useEffect(() => {
    PostService.getPosts()
      .then((result) => {
        // Set the fetched posts to the global state
        state.posts = result;
      })
      .catch((err) => {
        // Handle any errors that occur during fetching
        console.error("Error fetching posts:", err);
      });
  }, []);

  return (
    <div className="center"> {/* Render the center section */}
      <TobBox /> {/* Render the top box component */}
      
      {/* Render different components based on the activeIndex */}
      {snap.activeIndex === 0 && <MyPost />} {/* Render MyPost component if activeIndex is 0 */}
      {snap.activeIndex === 1 && <CreateWorkoutPlanBox />} {/* Render CreateWorkoutPlanBox component if activeIndex is 1 */}
      {snap.activeIndex === 2 && <CreaetMealPlanBox />} {/* Render CreaetMealPlanBox component if activeIndex is 2 */}

      {/* Render friends' posts when the activeIndex is 0 */}
      {snap.activeIndex === 0 && (
        <div>
          {/* Map through the posts and render FriendsPost component for each post */}
          {snap.posts.map((post) => {
            return <FriendsPost key={post?.id} post={post} />;
          })}
        </div>
      )}

      {/* Render workout plans when the activeIndex is 1 */}
      {snap.activeIndex === 1 && (
        <div>
          {/* Map through the workout plans and render WorkoutPlanCard component for each plan */}
          {snap.workoutPlans.map((plan) => (
            <WorkoutPlanCard key={plan.id} plan={plan} />
          ))}
        </div>
      )}

      {/* Render meal plans when the activeIndex is 2 */}
      {snap.activeIndex === 2 && (
        <div>
          {/* Map through the meal plans and render MealPlanCard component for each plan */}
          {snap.mealPlans.map((plan) => (
            <MealPlanCard key={plan.id} plan={plan} />
          ))}
        </div>
      )}

      {/* Render FriendsSection component when the activeIndex is 3 */}
      {snap.activeIndex === 3 && <FriendsSection />}
    </div>
  );
};

export default CenterSection;

