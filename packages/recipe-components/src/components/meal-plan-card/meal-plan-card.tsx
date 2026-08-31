import { Component, Event, EventEmitter, Host, Prop } from '@stencil/core';

export interface MealPlanEvent { day: string; }

@Component({ tag: 'meal-plan-card', styleUrl: 'meal-plan-card.css', shadow: true })
export class MealPlanCard {
  @Prop() day = '';
  @Prop() recipeTitle = '';
  @Prop() recipeImage = '';
  @Event() editMeal!: EventEmitter<MealPlanEvent>;
  @Event() removeMeal!: EventEmitter<MealPlanEvent>;
  @Event() viewMeal!: EventEmitter<MealPlanEvent>;
  private emit = (event: Event, emitter: EventEmitter<MealPlanEvent>) => { event.stopPropagation(); emitter.emit({ day: this.day }); };
  render() { return <Host><article><h2>{this.day}</h2><button class="meal" type="button" onClick={() => this.viewMeal.emit({ day: this.day })}>{this.recipeImage && <img src={this.recipeImage} alt="" />}<span>{this.recipeTitle || 'No meal assigned'}</span></button><div class="controls"><button type="button" onClick={(event) => this.emit(event, this.editMeal)}>Edit</button><button type="button" onClick={(event) => this.emit(event, this.removeMeal)}>Remove</button></div><footer><slot name="footer" /></footer></article></Host>; }
}
