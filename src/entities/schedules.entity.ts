import { Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import User from "./users.entity";
import RealEstate from "./realEstates.entity";

@Entity("schedules")
class Schedule {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ type: "date"})
  date: string | Date;

  @Column({ type: "time"})
  hour: string;

  @ManyToOne( ()=> User, (user)=> user.schedule)
  user: User

  @ManyToOne( ()=> RealEstate, (realEstate)=> realEstate.schedules)
  realEstate: RealEstate

  

  
}

export default Schedule;