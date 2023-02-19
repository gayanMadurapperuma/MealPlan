#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
// import { MealPlanStack } from '../lib/src/statefull/meal_plan-stack';
import { MealPreparationStatefull } from '../lib/statefull';
import { MealPlanStack } from '../lib/stateless/meal_plan-stack';

const app = new cdk.App();
const statefull = new MealPreparationStatefull(app, `mealTypeStatefull`);
new MealPlanStack(app, `mealPlanStateless`, {
  table: statefull.mealTable,
  snsService: statefull.notification
});