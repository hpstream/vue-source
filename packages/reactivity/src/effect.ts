export let activeEffect = undefined;

function cleanupEffect(effect: ReactiveEffect) {
  const { deps } = effect; // deps 里面装的是name对应的effect, age对应的effect
  for (let i = 0; i < deps.length; i++) {
    deps[i].delete(effect); // 解除effect，重新依赖收集
  }
  effect.deps.length = 0;
}
export class ReactiveEffect {
  public parent = null;
  public deps = [];
  public active = true;
  constructor(public fn, public scheduler) {}

  run() {
    if (!this.active) {
      return this.fn();
    }
    try {
      this.parent = activeEffect;
      activeEffect = this;
      cleanupEffect(this);
      return this.fn();
    } catch (error) {
    } finally {
      activeEffect = this.parent;
    }
  }
  stop() {
    if (this.active) {
      this.active = false;
      cleanupEffect(this); // 停止effect的收集
    }
  }
}

export function effect(fn, option?: Record<string, any>) {
  const _effect = new ReactiveEffect(fn, option?.scheduler);

  _effect.run(); // 默认先执行一次
  const runner = _effect.run.bind(_effect); // 绑定this执行
  runner.effect = _effect; // 将effect挂载到runner函数上
  return runner;
}

const targetMap = new WeakMap();

export function track(target, type: string, key) {
  let depsMap = targetMap.get(target);
  if (!depsMap) {
    targetMap.set(target, (depsMap = new Map()));
  }
  let dep = depsMap.get(key);
  if (!dep) {
    depsMap.set(key, (dep = new Set()));
  }
  trackEffects(dep);
}

export function trackEffects(dep: any) {
  if (!activeEffect) return;
  let sholdTrack = dep.has(activeEffect);
  if (!sholdTrack) {
    dep.add(activeEffect);
    activeEffect.deps.push(dep);
  }
}

export function trigger(target, type: string, key, oldvalue) {
  const depsMap = targetMap.get(target);
  if (!depsMap) return; // 触发的值不在模板中使用
  let effects = depsMap.get(key); // 找到了属性对应的effect

  // 永远在执行之前 先拷贝一份来执行， 不要关联引用

  triggerEffects(effects);
}
export function triggerEffects(effects: any) {
  if (effects) {
    effects = [...effects];
    effects.forEach((effect) => {
      if (effect !== activeEffect) {
        if (effect.scheduler) {
          effect.scheduler();
        } else {
          effect.run(); // 防止循环
        }
      }
    });
  }
}
