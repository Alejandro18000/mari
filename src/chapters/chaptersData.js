/**
 * chaptersData.js
 * Cifrado criptográfico en reposo para protección de privacidad en repositorios públicos.
 * Desencriptación y resolución de recursos en memoria al inicializar.
 */

const baseUrl = import.meta.env.BASE_URL || './';
export const asset = (path) => `${baseUrl}${path.startsWith('/') ? path.slice(1) : path}`;

function _d(b64, k) {
  const bin = atob(b64);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  const key = new TextEncoder().encode(k);
  const s = new Uint8Array(256);
  for (let i = 0; i < 256; i++) s[i] = i;
  let j = 0;
  for (let i = 0; i < 256; i++) {
    j = (j + s[i] + key[i % key.length]) & 255;
    const t = s[i]; s[i] = s[j]; s[j] = t;
  }
  let i = 0; j = 0;
  const out = new Uint8Array(bytes.length);
  for (let n = 0; n < bytes.length; n++) {
    i = (i + 1) & 255;
    j = (j + s[i]) & 255;
    const t = s[i]; s[i] = s[j]; s[j] = t;
    out[n] = bytes[n] ^ s[(s[i] + s[j]) & 255];
  }
  return new TextDecoder().decode(out);
}

function _resolve(item) {
  if (typeof item === 'string') {
    if (item.startsWith('images/') || item.startsWith('audio/')) {
      return asset(item);
    }
    return item;
  }
  if (Array.isArray(item)) return item.map(_resolve);
  if (item && typeof item === 'object') {
    const res = {};
    for (const [k, v] of Object.entries(item)) {
      res[k] = _resolve(v);
    }
    return res;
  }
  return item;
}

const _K = "vault_mari_0408";
const _C = "C7y3tssflGx/AqvuxKKrQpT9TccadTAu0wukJhTdysHsrUQUrnL4zJjhyjQgdfL3iWzPwjdNJA6/hio25f3/MD0JPEn+awg7falyA0lkiQ+8HfYrCnh0tgcDJ1C+wacdcXEGGYQitpaIDIQX0/pQFBmq1OwWkibMEukm6caHiZ4oKrg4yOHQUA2ZWe3e9gpHNhMQONvEHBVt6R1lS0GVp9umoGh1Ziny8/eT2wquEKDcWYch+BX3rcalSOQi26b+t5e6qiJ6gYKn58vNhcM51NnQUfbc8PLJIwyTuv2JfsWj+ga+yLQYEBuoyyL6bio47LjqIaGszjSRddV2yimz3n0h0TkHW2xDgGI3VdS8hQZqW7xrF5SaAtjmmpNZtbgcfhEI32juHthk8tMJ56+Mrl35De8RUsWr9z5fOacQAjasS+pibzEchP7WmEpHxK+UBLoAwyXtQMetiDZrPA+fAgcoDELKE3Y68X9hnM4bhTfAGZYODAW8RliN5mcqbTri/1Gr0Qbn+fsxFWrOqR0OVDcngsM61ktmCa1vplELuS01vhB8g7SoQbZgad/GVp8t/OefI9eQdTG4K1BJ0Tnz5FIqVU5fVaHtn3qv0w0CJSBkoNf7U6xpRZ//rRYgtIAsmM6mjOlm9T8GeT9Cvscdk78wHEsp7aks4uEESlAqXSBCKxz3V6Ild4NdeB5gt4PmIrBB2q2DIdh6ska25AAYT8Q9rlT355E7B0NXF5K6YSDSzVhEOl9MJWt/RY+G1Dx3d67EI0WT+EQwK/o0MpUAt6jitM9sZ0w8GHW2ymTcyael4FQmWi9cJAh0qZcMt3UWZd6iJ4Yt6DJCa7wHvlaHTwWnax2Pk1dB7gQK4nHpLK+R05XjXDX+9E+nEc0gvCfUTL41NTL45F60Kf/xfAtcuZHWq/Ue14S+5elIcm5Lfc2RTLKPU+18/C/rg3vlWSgDGenyT9kbyaLt0I7q1FqpsQ9sGyI4mOsfwkmwkfmm4HgKPo+8dY/6T57Ft0e2BVmyl+Ht9Zokl+UL0g1RhsajV2YXUCKn5jxXaNtXaoiT1O0f1Iz3QfqABWqoxg1RNfg0EEWwShcnxI0MbdvBUXToRPOj3kCLF3ZiFZj2qYT3qKkGDk6avgLil6Zxlui5cOwTzC6pM/Zhx3GZ+jBJhXD5GPSaTy+n0ihspENbBEUpyZCZFeya90LJjpxtPQGhEdCU20Iuz2zd05N8YaSeuv0C2TUw9R7z7orHFPbBfeAO204JLRKd/S9HJ0K5zw29yIf/dt0r/aKB70oYxMoE6NoUmaov5BNA9FQZXtYLYCq/Sy8CZIT0JQAb9nSjLTYeI24cWVn/WbID/q4dPtH27MUWkwbTf1wn7z/L4p+y3HZuE8wFfwT95SOTz6qgYepBSxq7SYOJLVszzIbC8vbstzAaeQEuUXdOSfD0+nHIUbluhPVQeSqaGzgSPvmLV6buTeehlRDoXF7qG0uYFR+PvQIGo4lB+PrO3anMcRI1U85a8O4UtG17/0kC6Dc7a3EJQYHvOR5Fv3qMiBKK5XK8jrjy8Rc4z/N5I3B2x3SMw3WhUDf5zXkXz/6+/bx4RCNnoq2rXxASU+9nMctdB6FuEXHG05ss3sbaKVXaH1F2Naer9hIyUqCiuKUH2GlnzYj99xQolg4Ek07e/k9n6C4IE/jW/ucP8JstSKHyD+njyowYj025J+GjmYCIP4hUkVpArsYzNZ/DXcSpn/0qbdf+dGQ7KQeQWEKUaVkRoVqS7SMOU/zT26GYHF+l3pLp+Wnw1fXJ6KW3bWshzOeMVSMxs2F94PXPt7cmj8VvtRoeZsXEE/TyHIyietISRRumQSuZD2+RyPTo5N99hhiIbRNTzxZR94LUK9X6G/nfMEUR8d6MjThn223YON743Rdvv6xLVnN+fFnrrpCAyjBrpayDiBjTOKhR/fiAw6xy7PqZ3ci3HXFKexEr6uNm3U6XHPe6MwzMmbs6EdfIk9ne11edw3Dy5oswpTrwwQcl4SUKQFb0we5LJ6p+Z3+c6a/1b5JBF0tmvBr2Wztzqxs6YMoFXr8aqaBBkco9CCfNMFEbNS1YPF4fCBTYXEuJxNV0C4lK8ATNHcvTW/0A/S1ZfUXv+8otyJ5ApGQrTa7qmBl6wkbBScvlIFSjPGBYvj2POC/dxxLl5whKNwUCBc40DrTOBUbklI8AYCYEMZCTwW0q35KU9JmcAL2cf7ibJtKjALxZ1CqHw5Cz0a01DslSxvdYZF1XOcsdrsAWob2hFZf6HySfmWaYfsmY5+cwzE2ryefBblpHLybPNaECFiWgc0ZND3MhkdCaBxqzd6t0ctZUw5gJQ9n2jfN1NyqU+yU+RXkKWTWHaraIH89QV3Oq9Ep3xHETIewwOzED12yWsGpzmtljN9P9SIQjElX/G/sTYk5nzbhs4g0PMUFONryeOslGuZ8nCb/RycMQ2CbgEjA3j6arbVpf8oVFJjpdts83pan1Y6SOdj/ORK55Bv4mgvUnPMPxHC2DSskXy9firjdPXFR52x852Dp6KHu5rV32WYQaqLwy9gQuml7rD9uRKj2lqNSug78/hjj83sTrKxFmEsu2pTbc6guWWv0kEmxH/wIEDmfkCev1zOV6AVcyNK4+PVUNs5sKK6RO+xkSsp92num3wCGDNOqBx7agLfvBXDKoUICfS+k5auV1x8Px3MUYKFYmqpJybo1zNVCghAXC6LkHjpqpknbyWao3sHPCn6ymk92FGrUG5Zp/hEOLJEbJUkOCy2Dj9ztGNv8moGdjc7/We4gAZfw86X+XHqrZZ/r1wuuMRm9kYl+Y79HykEM/LknkAs5Istf4Lmi8KmPU61cTAG2QqSBU42Z+/W2UrqHpzk+v0bF7mayQB8pJECoklB9aXix/SJOxnKJgenDIdgWN7SdFAaM7Chpf0GkNrAQLNvk23uI4ox+7Mbqy3WxNRzZptkbcJP24VhgMnbn1QzJk/g69K02W6ZyDHxXEFZXTC/1zEkqQsnjWy6SaV0xxaPAFMJGlwCe+Pr50yDojohbu/WWwn35Ly1ZRkRMZl83HjByAcbDkfMs3Wd21Pjq1vztftXreVZGnb0uyrOVMtdZBlJjHpleabu4mgBgFdN2i11GE8WGcWi6VZp62NzvioqE+5Lpf/E6J7F8V5Tm3gkoz/tXeYAvY9g1otwEGaq/mYtlm6b1E9Q9u7kCSw/TGQwfe+tkJNY+O3OTTe4tvgfiyQoiTjlu1MrIyutqPax+AZbxpDhxI3dCC1y2Wx8nW7GTNbtqgTQoSRlonvPFGmioB1DUZDDhKjpi4EjYoHlTZq5wmRB/5D7qvnpwfvKOxYjWEm437jkRD0AUCh4158slW2ZBgVvRkhqu29AADUzwcncRPxe7V6fRG9cibVm3RZ0RgP9OGebij6F5DF2Di7isYYfCqDdp0HOfEIpIHlDQXFlBH095fu5bzhCmXECianSOSAK1I/BepTnwIud0aRNr1OBe/4WdMfCKLnitAkpep2ZuMvtkHji2/yn6zajjgb6sHnV94q9b4Q+lh/ANMoIfMKH+0YWrTVgC4JQ0NjbVMskXQy3pjsozjLZzLsF6VlE3Xeq11md5efFVzFgx4WSr59Otqo4drfEZ9XrKNf3UH7WWnWTDzqdbyA3irhwqFkUpklNgE2llqh4Vt9Kfle4mqdYNB3K/6UVhQJq+SjIIluopjRfDGTQ/Zbm3YWLXwkhRvq0ybXRcjbXjsL0LI9ZGUj+w/owy9WW772MmdC1zDlLDaPL4KA0BlngwS3+D6tRZ5DSjD+ZvYo8ahf9mCtcHvtGzLAhwMHerWNbYaHdeiRRZJl3973o4G7duOpj6jUrmzoPpKd3GiRxD47LoFjBh+aprATOCEzWvC/uUw8PZAQbtdIi1H1uvItmvYNIPe4zco8joiJO+xT8wbACrq+LxNEbC9wF7S9bPXsMu6TwvkPZdgA4pgZZxPB7V/XgFPnpkYwUU7kbdaVgutBIPExkg0ff1fxR9gU/2pcft5c0JuWGmRiVKflVXrwapTOMi7xbKeaklGMbnbTeBmjg9eQ7UaM96SGTO1rNde4jiY9UFqlVB7du13/owQKMQDfp9z4pCElCYddDt0R1kiWZ5fuUnB9i+YyTNSS3yLNXV8gRTr6g4u/3v1jMbY/AQpf5v63tOSIKLip6loiGLdA/MG5MtPzAc7f2qQlo+/iHjY0UbTQrONjRGTnqnXUJiRYFUUtaPRvaM+Z7LSvSQPw/v6hRjXM2swxurVg2bywjGw/uo1qtPzuKnQD/PF+392nhEtdFKXDKwiPd7KQZRjvTgFW0Edt7zX8K/hcPJ49goh3b4xUlmwZvJB/eKNg4F8cpasjLpCCPyhcJQWjuD5H9Q1LwNTh2esvxEjG8wjnEy4gYlk8ZYlvbtsfWTHjtTf4Ds1ilUeFDaWXNjEwenQrjy3pmj8fYK9yMbs7OrmkCfs72siSKsZiVVzKJ/RJYIT5U1Zq+7WyrAk5HZWgjY+wyfdDAT6fKCj/pAbM7RMPeciMAHEhSoSe0gLaFJzgTvDO3v5UWJt1dzouLgUy1B4xloPLb9hPTmoQQOE9hi8Ekb5apttZX9JZtZ95j6n2HzPaKV0a2+RaJpeOZHHbfd0VE9eMqe7GANrPbwK26cCLApHOUOmUZpQQSdBnFhjhF4XtWODn80jOllIWW/P6R/hqj5duJnNlb2tIEtzuCUaBvxFO8itPTaFPxCXtDIuGPP7xtlUdEXz2iPPnV2liDRUKfLqYP3MRKrloN+0/gCAOWu0Xp8JDEbBul0hs1nZm9p/a24rByV0Zd0hk/mRiFe8Q2c5RoZKJ+QrUisHprRZwQZvXqns6RhVGFSapMNamFx+uRWSjQSb90yrfhxXle1SVU262RNpkpcQ2zGqHmM5yZSKVoQ/QpKLQdugsrK+8Du2WCc0cuQinEo2g9DtTtqfj0OpKBaIIiQyD2aamG5Z4vCLRz77/UdBMJiQrZQhtwNeZ0J8BcpozuWYANnY1cCdq5eJjCPkLeDgwdLd/Z3QxrXGv20CwyD1Liy/lY7k9BZmA0kNJYbWLSjk1EFIdGawLNIBR8WSwjPu1MkR6lxdr++JtJz8FegddeMy9Q/VtESsgcFtZ8wKdg1XAByMSbSBMlA45EwQY0Rb0R5btRCAkVclgGIp9uBH3inlZy+fus5BdU46W7gC4j1jZEBoXNBH66ETshtiJ4XqaMSDI1F/APpg2v34cISOtgdWRp54dfhKKLY0nMkx2tKZx7NB5FpBFNsobn8uhwSKOz+NHnuVqvafbZwHmTRxaeu2ZhIQbCmsi31IvmqnM+ib9sfw16+a096i6ovykPYN9cIboHdMxWDXcXbCdhcP7NoIGU0yX/tjpSzw7C0exG+11/ltsZWJGNqF76BvZX/OHkJ88TEgS6vqrKDGYLu31v3wlWr87XKnRYN7sKbfg9uGXR/Phn+gl2CcbimI0MsLQQne6dNtVtIonmiaw1FAI6M+qYtNvob3Uzt25k/KVefA495jMTCxJFO0VMBRda5h213MS+EaEuM7DUQuS9e1SO4Zw1GaLKroiOo7ZR94YqYm80HkdPEz2w6J54l/VrKHIw5nUKS8khLVLJs664g5+unQ/u8SVeeGi7m4rGaAivarhclbZ0aritHbbtBaD06eEOlFvqrlRxM9PhCWu8htFJQomnALSfI+Lzb4jfTR59odaYJuJOhZWzmotb0b0cWp2BeF0cCEmW3NBmf84NLFU9X8+HYtwo3LYMa8vZxNYvrxlQQ7GMTGMsOdgD0CZIY/QJbDs06O0fuhtFCpDE/coa1gubNPNZzoLj6O7X7QJJ5L1t+KlLQSW5r9wHqOkSZFoN4W8fd+sg6y8OtynZVvrShpHl9DKpj7Aeg/a+5ZtKxBKYqPCqkL3pXCVD5hBQALbWsfhW3EuHDk5/3jz+qMkU4kC91EnbZSOG40p9RLoxcDeY6hnfyUvfHxBC//UVAxnB5clTgLIo944hfY+Bom61SDkspSgzr3hK8Bnka89KPNRcU61AcHuzWPnjbmWylN5DNhpjNsqNgt+VtG291J5F0iV09OXBkXddO5WrSz6MUxsptvDfqyntYU5lK9Pxl7HUoRReWY9VPHR6rmA6EzTw048fvlelc3WbFtM3qKpXOtIJlR4/0oylY5OPjXolzYnFSQ8361iGLl/x337SYKaoiVlEKt2hg2SN0NvNAWNpsiS9F8YHRZjDdXIWFMYlrIfcfXkj4AjyYZOWOutXJ/hVDFQRdrCzhaaNLIxHywzqowesOmXtFR+SetPIYilyXMTlbDoN84P5lb8Dzfazj7HQv8qhVK1chLVx5GlGF/5MJRgFAjepROwr+aiaeHPUbii1N2ldpwfalPODQaPJH8cEW6XwQwOL5bLpO581JK/rrd79l9fToyU/TiYMDlwCfnj/nSi40TUTxd0d1cwUO+lIFqlhLfxdDpFdhs8yYH21q+/fArLPFoTPTlbQD9";

const _DATA = _resolve(JSON.parse(_d(_C, _K)));

export const bookMetadata = _DATA.bookMetadata;
export const chapters = _DATA.chapters;
export const bookPages = _DATA.bookPages;
