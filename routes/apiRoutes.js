const router = require('express').Router();
const Workout = require("../models/Workout.js");

// create a new workout
router.post("/workouts", (req, res) => {
    Workout.create({})
      .then(dbWorkout => {
        res.json(dbWorkout);
      })
      .catch(err => {
        res.status(500).json(err);
      });
  });

  // get all workouts, sum the total duration
  router.get("/workouts", (req, res) => {
    Workout.aggregate([
      {
        $addFields: {
          totalDuration: {
            $sum: "$exercises.duration"
          }
        }
      }
    ])
    .then(dbWorkouts => {
          res.json(dbWorkouts);
        })
        .catch(err => {
          res.status(500).json(err);
        });
  });

  // limit the workouts to 7
  router.get("/workouts/range", (req, res) => {
    Workout.aggregate([
      {
        $addFields: {
          totalDuration: {
            $sum: "$exercises.duration"
          }
        }
      }
    ]).limit(7)
    .then(dbWorkouts => {
      res.json(dbWorkouts);
    })
    .catch(err => {
      res.status(500).json(err);
    });
  });
  
  // delete a workout
  router.delete("/workouts/range", (req, res) => {
      Workout.findByIdAndDelete(body.id)
      .then()
      .catch(err => { res.status(500).json(err) })
  });
  
  // new workout
  router.put("/workouts/:id", ({ body, params }, res) => {
    Workout.findByIdAndUpdate(
      params.id,
      { $push: { exercises: body } },
      { new: true, runValidators: true }
    )
      .then(dbWorkout => { res.json(dbWorkout) })
      .catch(err => { res.status(500).json(err) });
  });
  
  module.exports = router;