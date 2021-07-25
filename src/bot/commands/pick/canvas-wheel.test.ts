import { createCanvas } from 'canvas';
import { createCanvasWheel } from './canvas-wheel';

const createWheelWithOptions = (
  options: string[],
  endAngle: number,
  totalSteps: number
) => {
  const canvas = createCanvas(100, 100);
  const ctx = canvas.getContext('2d');

  return createCanvasWheel(canvas, ctx, options, endAngle, totalSteps);
};

it('should rotate to first option with 360 degrees rotation and 4 options', () => {
  const options = ['1', '2', '3', '4'];
  const wheel = createWheelWithOptions(options, 360, 100);
  expect(wheel.getOptionByStep(0)).toBe(options[0]);
  expect(wheel.getOptionByStep(100)).toBe(options[0]);
});

it('should rotate to first option with 44 degrees rotation and 4 options', () => {
  const options = ['1', '2', '3', '4'];
  const wheel = createWheelWithOptions(options, 44, 100);
  expect(wheel.getOptionByStep(0)).toBe(options[0]);
  expect(wheel.getOptionByStep(100)).toBe(options[0]);
});

it('should rotate to second option with 45 degrees rotation and 4 options', () => {
  const options = ['1', '2', '3', '4'];
  const wheel = createWheelWithOptions(options, 45, 100);
  expect(wheel.getOptionByStep(0)).toBe(options[0]);
  expect(wheel.getOptionByStep(100)).toBe(options[1]);
});

it('should rotate to second option with 134 degrees rotation and 4 options', () => {
  const options = ['1', '2', '3', '4'];
  const wheel = createWheelWithOptions(options, 134, 100);
  expect(wheel.getOptionByStep(0)).toBe(options[0]);
  expect(wheel.getOptionByStep(100)).toBe(options[1]);
});

it('should rotate to third option with 135 degrees rotation and 4 options', () => {
  const options = ['1', '2', '3', '4'];
  const wheel = createWheelWithOptions(options, 135, 100);
  expect(wheel.getOptionByStep(0)).toBe(options[0]);
  expect(wheel.getOptionByStep(100)).toBe(options[2]);
});
