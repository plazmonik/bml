var obrona =
{
    "X ": {
        "description": ["5 młodsza i 4 starsza"]
    },
    "2C": {
        "description": ["min. 44 na starszych"],
        "answers": {
            "2D": {
                "description": ["pytanie o skład"],
                "answers": {
                    "2H": {
                        "description": ["kiery nie gorsze od pików"],
                    },
                    "2S": {
                        "description": ["piki lepsze od kierów"],
                    }
                }
            },
            "2H": {
                "description": ["chcę grać 2!h"],
            },
            "2H": {
                "description": ["chcę grać 2!s"],
            }
        }
    },
    "2D": {
        "description": ["mutli (może być czasami z 5. i w dowolnej sile)"],
        "answers": {
            "2H": {
                "description": ["pasuj, jeśli masz kiery"]
            },
            "2S": {
                "description": ["pasuje, jeśli masz piki; licytuj 3!h jeśli masz kiery"]
            },
            "2N": {
                "description": ["pytanie o siłę i skład"],
                "answers": {
                    "3C": {
                        "description": ["maksimum"],
                        "answers": {
                            "3D": {
                                "description": ["automat; kiery, czy piki?"],
                                "answers": {
                                    "3H": {
                                        "description": ["kiery"],
                                    },
                                    "3S": {
                                        "description": ["piki"],
                                    }
                                }
                            }
                        }
                    },
                    "3H": {
                        "description": ["słabe na kierach"],
                    },
                    "3S": {
                        "description": ["słabe na pikach"],
                    }
                }
            }
        }
    },
    "2H": {
        "description": ["5+kierów 4+młodsze"],
    },
    "2S": {
        "description": ["5+pików 4+młodsze"],
    },
    "2N": {
        "description": ["5+/5+ młodsze"],
    }
}
