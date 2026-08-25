declare module "gsap" {
  export class Tween {
    kill(): void;
  }

  export const gsap: {
    to(target: unknown, vars: Record<string, unknown>): Tween;
    fromTo(
      target: unknown,
      from: Record<string, unknown>,
      to: Record<string, unknown>
    ): Tween;
    core: {
      Tween: typeof Tween;
    };
  };

  export default gsap;
}
