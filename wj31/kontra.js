var kontra =
{
  "description": "Czy odzywka przeciwnika jest szlemikiem/szlemem?",
  "yes": {
    "description": "Czy odzywka przeciwnika jest forsująca?",
    "yes": {
      "description": "Kontra wistowa"
    },
    "no": {
      "description": "Czy ja będę wistować jeżeli odzywka przeciwników będzie grana?",
      "yes": {
        "description": "Kontra karna"
      },
      "no": {
        "description": "Kontra Lightnera"
      }
    }
  },
  "no": {
    "description": "Czy nasza strona zalicytowała już coś, co nie było pasem?",
    "yes": {
      "description": "Czy mój PAS byłby forsujący?",
      "yes": {
        "description": "Kontra karna, zniechęcająca"
      },
      "no": {
        "description": "Czy wcześniej nasza strona rekontrowała (nie SOS) albo kontrowała karnie?",
        "yes": {
          "description": "Kontra karna"
        },
        "no": {
          "description": "Czy, jak spasujemy licytacja się skończy?",
          "yes": {
            "description": "Kontra wznawiająca"
          },
          "no": {
            "description": "Czy, kontrujemy konwencję kolor przeciwnika",
            "yes": {
              "description": "Kontra łapiemy ich"
            },
            "no": {
              "description": "Czy kontrujemy konwencję trzeci/czwarty kolor",
              "yes": {
                "description": "Czy raczej mój partner będzie wistował, albo nie wiadomo na razie, kto będzie wistował?",
                "yes": {
                  "description": "Kontra wistowa"
                },
                "no": {
                  "description": "Kontra Propozycja Obrony"
                }
              },
              "no": {
                "description": "Czy kontrujemy po wejściu po otwarciu partnera 2!c, 2!d, 2!h lub 2!s?",
                "yes": {
                  "description": "Kontra do koloru"
                },
                "no": {
                  "description": "Czy partner pokazał nam w ostatniej odzywce kolor 4kartowy, a licytacja jest poniżej 2 w jego kolor?",
                  "yes": {
                    "description": "Kontra fit"
                  },
                  "no": {
                    "description": "Czy, kontrujemy 1!h po otwarciu partnera?",
                    "yes": {
                      "description": "Kontra, mam dokładnie 4 piki"
                    },
                    "no": {
                      "description": "Czy zostały jeszcze co najmniej dwa nielicytowane kolory?",
                      "yes": {
                        "description": "Kontra negatywna"
                      },
                      "no": {
                        "description": "Kontra karna"
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
    "no": {
      "description": "Czy odzywka przeciwnika jest sztuczna, forsująca?",
      "yes": {
        "description": "Czy odzywka przeciwnika to 1!c?",
        "yes": {
          "description": "Kontra 1!c"
        },
        "no": {
          "description": "Czy odzywka przeciwnika to otwarcie 2!d?",
          "yes": {
            "description": "Kontra wywoławcza do wariantu z pikami lub Objaśniająca"
          },
          "no": {
            "description": "Czy raczej mój partner będzie wistował, albo nie wiadomo na razie, kto będzie wistował?",
            "yes": {
              "description": "Kontra wistowa"
            },
            "no": {
              "description": "Kontra Propozycja Obrony"
            }
          }
        }
      },
      "no": {
        "description": "Czy odzywka przeciwnika to otwarcie 1BA?",
        "yes": {
          "description": "Kontra, 5młodsza, 4starsza"
        },
        "no": {
          "description": "Czy odzywka przeciwnika jest końcówką?",
          "yes": {
            "description": "Kontra karna"
          },
          "no": {
            "description": "Kontra Wywoławcza bądź Objaśniająca"
          }
        }
      }
    }
  }
}
