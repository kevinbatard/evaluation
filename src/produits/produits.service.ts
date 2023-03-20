import { Injectable } from '@nestjs/common';
import { CreateProduitDto } from './dto/create-produit.dto';
import { UpdateProduitDto } from './dto/update-produit.dto';
import { Produit } from './entities/produit.entity';

@Injectable()
export class ProduitsService {
  async create(createProduitDto: CreateProduitDto): Promise<Produit> {
    const newProduct = new Produit();

    newProduct.nom = createProduitDto.nom;
    newProduct.prix = createProduitDto.prix;
    newProduct.quantité = createProduitDto.quantité;

    await newProduct.save();

    return await Produit.findOne({ where: { id: newProduct.id } });
  }

  async findAll(): Promise<Produit[]> {
    return await Produit.find();
  }

  async findOne(id: number): Promise<Produit> {
    return Produit.findOneBy({ id });
  }

  async update(
    id: number,
    updateProduitDto: UpdateProduitDto,
    product: Produit,
  ): Promise<Produit> {
    product.nom = updateProduitDto.nom;
    product.prix = updateProduitDto.prix;
    product.quantité = updateProduitDto.quantité;

    await product.save();

    return await Produit.findOneBy({ id });
  }

  async remove(product: Produit) {
    return Produit.remove(product);
  }
}
