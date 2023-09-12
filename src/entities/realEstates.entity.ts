import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import Category from "./categories.entity";
import Address from "./addresses.entity";
import Schedule from "./schedules.entity";

@Entity("realEstates")
class RealEstate {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ type: "boolean", default:false})
  sold: boolean;

  @Column({ type: "decimal", precision: 12, scale:2, default:0})
  value: number | string;

  @Column()
  size: number;

  @CreateDateColumn({type:"date"})
  createdAt: string;

  @UpdateDateColumn({type:"date"})
  updatedAt: string;

  @ManyToOne( ()=> Category, (category)=> category.realEstate)
  category: Category

  @OneToOne(()=> Address, (address)=> address.realEstate)
  @JoinColumn()
  address: Address

  @OneToMany( ()=> Schedule, (schedule)=> schedule.realEstate)
  schedules:Array<Schedule>
}

export default RealEstate;