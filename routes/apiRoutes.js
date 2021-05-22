const router = require('express').Router();
const Workout = require("../models/Workout.js");

router.post("/apiRoutes/workouts", (req, res) => {
    Workout.create({})
      .then(dbWorkout => {
        res.json(dbWorkout);
      })
      .catch(err => {
        res.status(500).json(err);
      });
  });

  router.get("/apiRoutes/workouts", (req, res) => {
    Workout.find({})
      .then(dbWorkouts => {
        res.json(dbWorkouts);
      })
      .catch(err => {
        res.status(500).json(err);
      });
  });
  
  router.get("/apiRoutes/workouts/range", (req, res) => {
    Workout.find({}).limit(8)
      .then(dbWorkouts => {
        res.json(dbWorkouts);
      })
      .catch(err => {
        res.status(500).json(err);
      });
  });

  router.delete("/apiRoutes/workouts/range", (req, res) => {
      Workout.findByIdAndDelete(body.id)
      .then()
      .catch(err => { res.status(500).json(err) })
  });

  router.put("/apiRoutes/workouts/:id", ({ body, params }, res) => {
    Workout.findByIdAndUpdate(
      params.id,
      { $push: { exercises: body } },
      { new: true, runValidators: true }
    )
      .then(dbWorkout => { res.json(dbWorkout) })
      .catch(err => { res.status(500).json(err) });
  });
  
  module.exports = router;