function triangle(val1, type1, val2, type2) {
  type1 = type1.toLowerCase();
  type2 = type2.toLowerCase();

  // helpers
  const toRad = d => d * Math.PI / 180;
  const toDeg = r => r * 180 / Math.PI;

  let a = null, b = null, c = null, alpha = null, beta = null;

  // LEG + LEG
  if (type1 === "leg" && type2 === "leg") {
    a = val1;
    b = val2;
    c = Math.sqrt(a*a + b*b);
    alpha = toDeg(Math.asin(a / c));
    beta = 90 - alpha;
  }

  // LEG + HYPOTENUSE
  else if ((type1 === "leg" && type2 === "hypotenuse") ||
           (type2 === "leg" && type1 === "hypotenuse")) {
    let leg = type1 === "leg" ? val1 : val2;
    let hyp = type1 === "hypotenuse" ? val1 : val2;

    if (leg >= hyp) return "invalid";

    a = leg;
    c = hyp;
    b = Math.sqrt(c*c - a*a);
    alpha = toDeg(Math.asin(a / c));
    beta = 90 - alpha;
  }

  // HYPOTENUSE + ANGLE
  else if ((type1 === "hypotenuse" && type2 === "angle") ||
           (type2 === "hypotenuse" && type1 === "angle")) {
    let hyp = type1 === "hypotenuse" ? val1 : val2;
    let ang = type1 === "angle" ? val1 : val2; // alpha

    c = hyp;
    alpha = ang;
    beta = 90 - alpha;

    a = c * Math.sin(toRad(alpha));
    b = c * Math.cos(toRad(alpha));
  }

  else {
    return "failed";
  }

  console.log("a =", a);
  console.log("b =", b);
  console.log("c =", c);
  console.log("alpha =", alpha);
  console.log("beta =", beta);

  return "success";
}

// examples:
console.log(triangle(3, "leg", 4, "leg"));
console.log(triangle(4, "leg", 8, "hypotenuse"));
console.log(triangle(10, "hypotenuse", 30, "angle"));
