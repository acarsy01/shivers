import { Embed as EmbedType, EmbedAuthor, EmbedField, EmbedFooter, EmbedImage, EmbedThumbnail } from "../modules/Discordeno/types/message.ts"

class Embed implements EmbedType {
  title: string;
  author: EmbedAuthor;
  thumbnail: EmbedThumbnail;
  footer: EmbedFooter;
  fields: EmbedField[];
  image: EmbedImage;
  color: (number | undefined);

  constructor() {
    this.title = "";
    this.author = {};
    this.thumbnail = {};
    this.footer = { text: "" };
    this.fields = [];
    this.image = {};
    this.color = undefined;
  }

  addField(name: string, value: string, inline: boolean = false): Embed {
    const field = {} as EmbedField;
    field.name = name;
    field.value = value;
    field.inline = inline;

    this.fields.push(field);

    return this;
  }

  setTitle(title: string): Embed {
    this.title = title;

    return this;
  }

  setAuthor(name: string, icon_url: (string | undefined) = undefined, url: (string | undefined) = undefined): Embed {
    this.author.name = name;
    this.author.icon_url = icon_url;
    this.author.url = url;

    return this;
  }

  setColor(color: number): Embed {
    this.color = color;

    return this;
  }

  setThumbnail(url: string): Embed {
    this.thumbnail.url = url;

    return this;
  }

  setFooter(text: string, icon_url: (string | undefined) = undefined): Embed {
    this.footer.text = text;
    this.footer.icon_url = icon_url;

    return this;
  }

  setImage(url: string): Embed {
    this.image.url = url;

    return this;
  }
}

export default Embed;