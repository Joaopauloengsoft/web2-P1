import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne } from "typeorm";
import type { Relation } from "typeorm";
import { ProductSituation } from "./ProductSituations.js";
import { ProductCategory } from "./ProductCategories.js";

@Entity("products")
export class Product {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column()
    productSituationId!: number;

    @ManyToOne(() => ProductSituation, (productSituation) => productSituation.products)
    @JoinColumn({ name: "productSituationId" })
    productSituation!: Relation<ProductSituation>;

    @Column()
    productCategoryId!: number;

    @ManyToOne(() => ProductCategory, (productCategory) => productCategory.products)
    @JoinColumn({ name: "productCategoryId" })
    productCategory!: Relation<ProductCategory>;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    createdAt!: Date;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" })
    updatedAt!: Date;
}